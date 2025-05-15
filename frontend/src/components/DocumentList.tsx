import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  Spinner,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { Plus, ChevronRight, ChevronDown, MoreVertical } from 'lucide-react';
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

// Document tree item component
interface TreeItemProps {
  document: DocumentType;
  documents: DocumentType[];
  level: number;
  selectedDocId: string | null;
  onSelectDocument: (docId: string, s3Key?: string | null, title?: string) => void;
  onCreateSubpage: (parentId: string) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  document,
  documents,
  level,
  selectedDocId,
  onSelectDocument,
  onCreateSubpage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const childDocuments = documents.filter(doc => doc.parentDocumentId === document.id);
  const hasChildren = childDocuments.length > 0;

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <Box>
      <Flex alignItems="center">
        {hasChildren ? (
          <Box 
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="24px"
            height="24px"
            onClick={() => setIsExpanded(!isExpanded)}
            mr={1}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Box>
        ) : (
          <Box width="24px" /> // Spacer for alignment
        )}
        <Box
          flex="1"
          p={2}
          pl={level === 0 ? 2 : 2 + level * 4}
          borderRadius="md"
          bg={selectedDocId === document.id ? 'gray.100' : 'transparent'}
          cursor="pointer"
          _hover={{ bg: 'gray.50' }}
          onClick={() => onSelectDocument(document.id, document.s3ContentKey, document.title)}
          borderLeft={selectedDocId === document.id ? '3px solid' : '3px solid transparent'}
          borderLeftColor={selectedDocId === document.id ? 'brand.500' : 'transparent'}
          mr={2}
        >
          <Text fontWeight={selectedDocId === document.id ? 'medium' : 'normal'} color={selectedDocId === document.id ? 'brand.500' : 'gray.700'}>
            {document.title}
          </Text>
          {document.updatedAt && (
            <Text fontSize="xs" color="gray.500">
              Last edited: {new Date(document.updatedAt).toLocaleDateString()}
            </Text>
          )}
        </Box>
        
        {/* Custom Menu */}
        <Box position="relative" ref={menuRef}>
          <Box 
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="24px" 
            h="24px"
            borderRadius="sm"
            _hover={{ bg: 'gray.100' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MoreVertical size={14} />
          </Box>
          
          {isMenuOpen && (
            <Box
              position="absolute"
              right="0"
              top="100%"
              mt="1"
              zIndex={10}
              bg="white"
              boxShadow="md"
              borderRadius="md"
              border="1px"
              borderColor="gray.200"
              width="150px"
            >
              <Box
                as="button"
                w="full"
                textAlign="left"
                px={3}
                py={2}
                _hover={{ bg: 'gray.50' }}
                onClick={() => {
                  onCreateSubpage(document.id);
                  setIsMenuOpen(false);
                }}
              >
                Create Subpage
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
      
      {isExpanded && hasChildren && (
        <Box ml={4}>
          {childDocuments.map(childDoc => (
            <TreeItem
              key={childDoc.id}
              document={childDoc}
              documents={documents}
              level={level + 1}
              selectedDocId={selectedDocId}
              onSelectDocument={onSelectDocument}
              onCreateSubpage={onCreateSubpage}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

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
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [newSubpageTitle, setNewSubpageTitle] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
  const handleCreateNewDocument = async (parentDocumentId: string | null = null) => {
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
      const newDocTitle = parentDocumentId 
        ? newSubpageTitle || `Untitled Subpage ${new Date().toLocaleString()}`
        : `Untitled Document ${new Date().toLocaleString()}`;
      
      const createResponse = await client.models.Document.create({
        title: newDocTitle,
        isPinned: false,
        parentDocumentId: parentDocumentId || undefined,
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
      
      // Reset the subpage modal state
      setNewSubpageTitle('');
      setIsCreateModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create document';
      console.error('Error creating document:', err);
      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  // Handle creating a subpage
  const handleCreateSubpage = (parentId: string) => {
    setSelectedParentId(parentId);
    setNewSubpageTitle('');
    setIsCreateModalOpen(true);
  };

  // Submit handler for the subpage creation modal
  const handleSubmitSubpage = () => {
    if (selectedParentId) {
      handleCreateNewDocument(selectedParentId);
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

  // Get top-level documents
  const topLevelDocuments = filteredDocuments.filter(doc => !doc.parentDocumentId);

  return (
    <>
      <Box p={4} borderBottom="1px" borderColor="gray.200">
        <Button
          colorScheme="brand"
          variant="solid"
          width="full"
          onClick={() => handleCreateNewDocument()}
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
              topLevelDocuments.map(doc => (
                <TreeItem
                  key={doc.id}
                  document={doc}
                  documents={filteredDocuments}
                  level={0}
                  selectedDocId={selectedDocId}
                  onSelectDocument={onSelectDocument}
                  onCreateSubpage={handleCreateSubpage}
                />
              ))
            )}
          </Box>
        )}
      </Box>

      {/* Simple Subpage Creation Modal */}
      {isCreateModalOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0,0,0,0.5)"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <Box 
            bg="white" 
            p={4} 
            borderRadius="md" 
            width="400px"
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontWeight="bold" mb={3}>Create Subpage</Text>
            <Input
              placeholder="Enter subpage title"
              value={newSubpageTitle}
              onChange={(e) => setNewSubpageTitle(e.target.value)}
              mb={4}
            />
            <Flex justifyContent="flex-end">
              <Button 
                variant="ghost" 
                mr={2}
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                colorScheme="brand"
                onClick={handleSubmitSubpage}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

export default DocumentList; 