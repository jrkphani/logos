import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, Button, Flex, Spinner } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { generateClient } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { uploadData } from 'aws-amplify/storage';

// Document type based on amplify_outputs.json
interface DocumentType {
  id: string;
  title: string;
  s3ContentKey?: string | null;
  isPinned?: boolean;
  parentDocumentId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: string;
}

// Document list item component
interface DocumentItemProps {
  id: string;
  title: string;
  lastEdited?: string;
  isActive: boolean;
  onClick: (id: string, s3Key?: string | null, title?: string) => void;
  s3ContentKey?: string | null;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ 
  id, 
  title, 
  lastEdited, 
  isActive, 
  onClick,
  s3ContentKey
}) => (
  <Box
    p={3}
    borderRadius="md"
    bg={isActive ? 'gray.100' : 'transparent'}
    cursor="pointer"
    _hover={{ bg: 'gray.50' }}
    onClick={() => onClick(id, s3ContentKey, title)}
    borderLeft={isActive ? '3px solid' : '3px solid transparent'}
    borderLeftColor={isActive ? 'brand.500' : 'transparent'}
  >
    <Text fontWeight={isActive ? 'medium' : 'normal'} color={isActive ? 'brand.500' : 'gray.700'}>
      {title}
    </Text>
    {lastEdited && (
      <Text fontSize="xs" color="gray.500">
        Last edited: {new Date(lastEdited).toLocaleDateString()}
      </Text>
    )}
  </Box>
);

interface DocumentListProps {
  selectedDocId?: string | null;
  onSelectDocument: (docId: string, s3Key?: string | null, title?: string) => void;
  searchTerm?: string;
}

// Using any for Schema since the exact type structure from generateClient is complex
const client = generateClient<any>();

// Define a more specific response type for document list operations
interface DocumentListResponse {
  data?: {
    items?: any[];
    [key: string]: any;
  };
  errors?: Array<{ message: string }>;
}

const DocumentList: React.FC<DocumentListProps> = ({
  selectedDocId = null,
  onSelectDocument,
  searchTerm = '',
}) => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents owned by the current user
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching documents...');
      const response = await client.models.Document.list({}) as DocumentListResponse;
      
      console.log('Document list response:', response);
      
      if (response.errors) {
        throw new Error(response.errors.map(e => e.message).join('\n'));
      }
      
      // Check if response.data is an array directly
      if (Array.isArray(response.data)) {
        // If data is directly an array of documents
        const documentList = response.data.map(item => item as unknown as DocumentType);
        console.log(`Found ${documentList.length} documents:`, documentList);
        setDocuments(documentList);
      } else if (response.data && Array.isArray(response.data.items)) {
        // The data is nested within response.data.items (original handling)
        const documentList = response.data.items.map(item => item as unknown as DocumentType);
        console.log(`Found ${documentList.length} documents:`, documentList);
        setDocuments(documentList);
      } else {
        console.log('No documents found or unexpected response structure:', response);
        setDocuments([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load documents';
      console.error('Error fetching documents:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new document
  const handleCreateNewDocument = async () => {
    setIsCreating(true);
    setError(null);
    
    try {
      // Get the current authenticated user's identityId
      const session = await fetchAuthSession();
      const identityId = session.identityId;
      
      if (!identityId) {
        throw new Error("User identity not available. Please login again.");
      }
      
      // Create document metadata in DynamoDB
      const newDocTitle = `Untitled Document ${new Date().toLocaleString()}`;
      const createResponse = await client.models.Document.create({
        title: newDocTitle,
        isPinned: false,
        // owner is auto-set by backend @auth rule
      });
      
      if (createResponse.errors || !createResponse.data) {
        throw new Error(createResponse.errors?.map(e => e.message).join('\n') || "Failed to create document");
      }
      
      // Cast to DocumentType
      const createdDoc = createResponse.data as unknown as DocumentType;
      
      // Construct s3ContentKey
      const s3Key = `user-private/${identityId}/${createdDoc.id}/content.md`;
      
      // Upload initial empty markdown to S3
      const initialContent = `# ${newDocTitle}\n\nStart writing...\n`;
      await uploadData({
        path: s3Key,
        data: initialContent,
        options: { contentType: 'text/markdown' }
      }).result;
      
      // Update document with s3ContentKey
      const updateResponse = await client.models.Document.update({
        id: createdDoc.id,
        s3ContentKey: s3Key
      });
      
      if (updateResponse.errors) {
        throw new Error(updateResponse.errors.map(e => e.message).join('\n'));
      }
      
      // Update local state with the new document
      const updatedDocument = updateResponse.data as unknown as DocumentType;
      setDocuments(prevDocs => [updatedDocument, ...prevDocs]);
      
      // Select the newly created document
      onSelectDocument(updatedDocument.id, s3Key, updatedDocument.title);
      
      console.log(`Document created: "${newDocTitle}"`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create document';
      console.error('Error creating document:', err);
      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  // Initial fetch of documents
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Refresh the document list periodically while component is mounted
  useEffect(() => {
    // Refresh every 15 minutes instead of 10 seconds
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing document list...');
      fetchDocuments();
    }, 900000); // 15 minutes = 900000 milliseconds
    
    // Clean up on unmount
    return () => clearInterval(refreshInterval);
  }, [fetchDocuments]);

  // Filter documents based on search term
  const filteredDocuments = searchTerm 
    ? documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : documents;

  return (
    <>
      <Box p={4} borderBottom="1px" borderColor="gray.200">
        <Button
          colorScheme="brand"
          variant="solid"
          width="full"
          onClick={handleCreateNewDocument}
          size="md"
          bg="#07422B"
          color="white"
          _hover={{ bg: "#3D7359" }}
          borderRadius="0"
          disabled={isCreating}
        >
          <Box as="span" display="flex" alignItems="center">
            <Plus size={16} style={{ marginRight: '8px' }} />
            {isCreating ? 'Creating...' : 'Create New Document'}
          </Box>
        </Button>
      </Box>
      
      <Box p={4} overflowY="auto" height="calc(100% - 76px)">
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontSize="xs" textTransform="uppercase" color="gray.500" fontWeight="medium">
            All Documents
          </Text>
          <Button 
            size="xs" 
            onClick={fetchDocuments} 
            variant="ghost" 
            colorScheme="gray"
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Flex>
        
        {isLoading ? (
          <Flex justify="center" align="center" pt={4}>
            <Spinner size="md" color="brand.500" />
          </Flex>
        ) : error ? (
          <Box p={2} borderRadius="md" bg="red.50" color="red.600" fontSize="sm">
            Error: {error}
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap="4px">
            {filteredDocuments.length === 0 ? (
              <Text fontSize="sm" color="gray.500">
                {searchTerm ? 'No documents found matching your search' : 'No documents yet. Create your first document!'}
              </Text>
            ) : (
              filteredDocuments.map(doc => (
                <DocumentItem
                  key={doc.id}
                  id={doc.id}
                  title={doc.title}
                  lastEdited={doc.updatedAt}
                  isActive={selectedDocId === doc.id}
                  onClick={onSelectDocument}
                  s3ContentKey={doc.s3ContentKey}
                />
              ))
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default DocumentList; 