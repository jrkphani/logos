import React, { useState } from 'react';
import { Box, Heading, Text, Flex, Input, Badge, Spinner, IconButton } from '@chakra-ui/react';
import { Edit, Check, X } from 'lucide-react';
import { generateClient } from 'aws-amplify/api';

// Updated types based on amplify_outputs.json
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

// Using any for Schema since the exact type structure from generateClient is complex
const client = generateClient<any>();

interface DocumentDetailsProps {
  documentId?: string;
  initialData: DocumentType;
}

export const DocumentDetails: React.FC<DocumentDetailsProps> = ({ documentId, initialData }) => {
  const [title, setTitle] = useState(initialData.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const startTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const cancelTitleEdit = () => {
    setTitle(initialData.title);
    setIsEditingTitle(false);
  };

  const saveTitle = async () => {
    if (!documentId || title.trim() === '') return;

    setIsSaving(true);
    setError(null);

    try {
      const { data, errors } = await client.models.Document.update({
        id: documentId,
        title: title.trim()
      });

      if (errors) {
        throw new Error(errors.map(e => e.message).join('\n'));
      }

      setIsEditingTitle(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update title';
      console.error('Error updating document title:', err);
      setError(errorMessage);
      setTitle(initialData.title); // Revert on error
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box mb={4}>
      <Flex align="center" mb={2}>
        {isEditingTitle ? (
          <Flex align="center" w="100%">
            <Input
              value={title}
              onChange={handleTitleChange}
              size="md"
              fontWeight="bold"
              mr={2}
              autoFocus
              disabled={isSaving}
            />
            <IconButton
              aria-label="Save title"
              size="sm"
              onClick={saveTitle}
              disabled={isSaving || title.trim() === ''}
              mr={1}
            >
              {isSaving ? <Spinner size="sm" /> : <Check size={18} />}
            </IconButton>
            <IconButton
              aria-label="Cancel"
              size="sm"
              onClick={cancelTitleEdit}
              disabled={isSaving}
            >
              <X size={18} />
            </IconButton>
          </Flex>
        ) : (
          <>
            <Heading size="md" flex="1" mr={2}>
              {title}
            </Heading>
            <IconButton
              aria-label="Edit title"
              size="sm"
              variant="ghost"
              onClick={startTitleEdit}
            >
              <Edit size={16} />
            </IconButton>
          </>
        )}
      </Flex>

      <Flex flexWrap="wrap" gap={2} mb={2} fontSize="sm" color="gray.600">
        <Text>ID: {documentId}</Text>
        <Text>•</Text>
        <Text>Updated: {formatDate(initialData.updatedAt)}</Text>
        <Text>•</Text>
        <Text>Created: {formatDate(initialData.createdAt)}</Text>
      </Flex>

      <Flex gap={2}>
        {initialData.isPinned && (
          <Badge colorScheme="green">Pinned</Badge>
        )}
        {initialData.s3ContentKey ? (
          <Badge colorScheme="blue">Saved to cloud</Badge>
        ) : (
          <Badge colorScheme="yellow">Local draft</Badge>
        )}
      </Flex>

      {error && <Text color="red.500" mt={2} fontSize="sm">{error}</Text>}
    </Box>
  );
}; 