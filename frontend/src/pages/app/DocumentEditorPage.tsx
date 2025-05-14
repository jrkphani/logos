import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Spinner,
  Button,
  Text,
} from '@chakra-ui/react';
import { YooptaEditorComponent, convertMarkdownToYooptaValue } from '../../components/YooptaEditorComponent';
import type { YooptaEditorRef } from '../../components/YooptaEditorComponent';
import { DocumentDetails } from '../../components/DocumentDetails';
import ErrorBoundary from '../../components/ErrorBoundary';

import { generateClient } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { uploadData, downloadData } from 'aws-amplify/storage';

// Simple types for our API
type Schema = any;
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

interface UpdateDocumentInput {
  id: string;
  title?: string;
  s3ContentKey?: string;
  isPinned?: boolean;
  parentDocumentId?: string | null;
}

// Create client for Amplify API
const client = generateClient<Schema>();

function DocumentEditorPage() {
  const { docId } = useParams<{ docId: string }>();
  const editorRef = useRef<YooptaEditorRef>(null);
  
  // State for document data and UI
  const [documentMetadata, setDocumentMetadata] = useState<DocumentType | null>(null);
  const [initialYooptaValue, setInitialYooptaValue] = useState<any[] | undefined>(undefined);
  const [currentS3Key, setCurrentS3Key] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load document content from API and S3
  const loadDocumentContent = useCallback(async () => {
    if (!docId) {
      setError("No document selected.");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setInitialYooptaValue(undefined);

    try {
      // Fetch document metadata from DynamoDB via Amplify API
      const { data: docMeta, errors: metaErrors } = await client.models.Document.get({ id: docId });
      
      if (metaErrors || !docMeta) {
        throw new Error(metaErrors?.map(e => e.message).join('\n') || `Document metadata not found for ID: ${docId}`);
      }
      
      // Safely handle the docMeta type
      const documentData = docMeta as unknown as DocumentType;
      setDocumentMetadata(documentData);
      setCurrentS3Key(documentData.s3ContentKey || null);

      let yooptaValue;
      // If the document has content in S3, fetch it
      if (documentData.s3ContentKey) {
        const downloadResult = await downloadData({ path: documentData.s3ContentKey }).result;
        const markdownContent = await downloadResult.body.text();
        // Convert Markdown to Yoopta's format
        yooptaValue = convertMarkdownToYooptaValue(markdownContent);
      } else {
        // For new documents, create default content
        const defaultMarkdown = `# ${documentData.title || 'Untitled Document'}\n\nStart writing...`;
        yooptaValue = convertMarkdownToYooptaValue(defaultMarkdown);
      }
      
      setInitialYooptaValue(yooptaValue);
      
    } catch (err: any) {
      console.error(`Error loading document ${docId}:`, err);
      setError(err.message || 'Failed to load document content.');
      
      // Create error content for editor
      const errorYooptaValue = convertMarkdownToYooptaValue(`# Error Loading Document: ${docId}\n\n${err.message || 'Unknown error'}`);
      setInitialYooptaValue(errorYooptaValue);
    } finally {
      setIsLoading(false);
    }
  }, [docId]);

  // Load document when docId changes
  useEffect(() => {
    loadDocumentContent();
  }, [loadDocumentContent]);

  // Save document to S3 and update metadata in DynamoDB
  const handleSaveDocumentToCloud = async () => {
    if (!docId || !editorRef.current || !documentMetadata) {
      setError("Cannot save: No document selected or editor not ready.");
      return;
    }
    
    // Check if there are unsaved changes
    if (!editorRef.current.isDirty()) {
      setError("No unsaved changes.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);
    
    try {
      console.log('Starting save process for document:', docId);
      
      // Get Markdown content from Yoopta editor
      const markdownContent = await editorRef.current.getMarkdown();
      let s3KeyToUse = currentS3Key;

      // If this is the first save, create a new S3 key
      if (!s3KeyToUse) {
        console.log('No existing S3 key, creating new one...');
        const session = await fetchAuthSession();
        const identityId = session.identityId;
        
        if (!identityId) {
          throw new Error("User identityId not available for S3 path.");
        }
        
        s3KeyToUse = `user-private/${identityId}/${docId}/content.md`;
        console.log('Created new S3 key:', s3KeyToUse);
      }

      // Upload the Markdown content to S3
      console.log('Uploading content to S3 at path:', s3KeyToUse);
      await uploadData({
        path: s3KeyToUse,
        data: markdownContent,
        options: { contentType: 'text/markdown' }
      }).result;
      console.log('S3 upload successful');

      // Update the document metadata in DynamoDB
      const updateInput: UpdateDocumentInput = { 
        id: docId, 
        s3ContentKey: s3KeyToUse
      };
      
      console.log('Updating document metadata in DynamoDB:', updateInput);
      const { data: updatedDoc, errors: updateErrors } = await client.models.Document.update(updateInput);

      if (updateErrors || !updatedDoc) {
        throw new Error(updateErrors?.map(e => e.message).join('\n') || "Failed to update document metadata.");
      }

      console.log('Document metadata updated successfully:', updatedDoc);
      
      // Update local state
      setCurrentS3Key(s3KeyToUse);
      setDocumentMetadata(updatedDoc as unknown as DocumentType);
      editorRef.current.resetDirty();
      setSaveSuccess(true);

    } catch (err: any) {
      console.error('Error saving document:', err);
      setError(err.message || 'Failed to save document.');
    } finally {
      setIsSaving(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <Box padding={4}>
        <Spinner />
        <Text marginLeft={2}>Loading document...</Text>
      </Box>
    );
  }

  // Show error state
  if (error && !documentMetadata) {
    return (
      <Box padding={4} borderWidth="1px" borderRadius="md" backgroundColor="red.50">
        <Text fontWeight="bold">Error</Text>
        <Text>{error}</Text>
      </Box>
    );
  }
  
  // Show not found state
  if (!documentMetadata && !isLoading) {
    return <Text padding={4}>Document not found or you do not have access.</Text>;
  }

  // Show editor with document
  return (
    <Box>
      <Box padding={4} borderWidth="1px" borderRadius="md" marginBottom={4}>
        {documentMetadata && <DocumentDetails documentId={docId} initialData={documentMetadata} />}
        
        <Button
          onClick={handleSaveDocumentToCloud}
          disabled={isSaving || isLoading}
          colorScheme="brand"
          size="sm"
          marginTop={2}
        >
          {isSaving ? 'Saving...' : 'Save to Cloud'}
        </Button>
        
        {error && !isSaving && (
          <Box marginTop={2} padding={2} borderRadius="md" backgroundColor="yellow.50">
            <Text fontSize="sm">{error}</Text>
          </Box>
        )}
        
        {saveSuccess && (
          <Box marginTop={2} padding={2} borderRadius="md" backgroundColor="green.50">
            <Text fontSize="sm">Document saved to cloud!</Text>
          </Box>
        )}
      </Box>
      
      <Box 
        borderWidth="1px" 
        borderRadius="md"
        minHeight="400px"
      >
        {initialYooptaValue !== undefined && (
          <ErrorBoundary>
            <YooptaEditorComponent
              ref={editorRef}
              documentId={docId}
              initialValue={initialYooptaValue}
              onUpdate={() => {
                if (saveSuccess) setSaveSuccess(false);
              }}
            />
          </ErrorBoundary>
        )}
        {isLoading && initialYooptaValue === undefined && (
          <Text padding={4}>Preparing editor...</Text>
        )}
      </Box>
    </Box>
  );
}

export default DocumentEditorPage; 