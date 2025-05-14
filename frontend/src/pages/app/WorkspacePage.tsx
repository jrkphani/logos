import React, { useState } from 'react';
import { Box, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import DocumentList from '../../components/DocumentList';

export const WorkspacePage: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSelectDocument = (docId: string, s3Key?: string | null, title?: string) => {
    setSelectedDocId(docId);
    navigate(`/app/workspace/doc/${docId}`);
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Your Workspace</Heading>
      <Text mb={8}>
        Welcome, {user?.username || 'User'}! 
        {searchTerm 
          ? ` Showing results for "${searchTerm}"`
          : ' Here you can access your documents and create new ones.'
        }
      </Text>
      
      <Box maxWidth="800px" mx="auto" borderWidth="1px" borderRadius="md" bg="white">
        <DocumentList 
          selectedDocId={selectedDocId}
          onSelectDocument={handleSelectDocument}
          searchTerm={searchTerm}
        />
      </Box>
    </Box>
  );
};

export default WorkspacePage; 