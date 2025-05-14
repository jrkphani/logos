import React from 'react';
import { Box } from '@chakra-ui/react';
import DocumentList from '../DocumentList';

interface MainApplicationSidebarProps {
  isOpen: boolean;
  selectedDocId?: string | null;
  onSelectDocument?: (docId: string, s3Key?: string | null, title?: string) => void;
  onCreateNewDocument?: () => void;
  searchTerm?: string;
}

const MainApplicationSidebar: React.FC<MainApplicationSidebarProps> = ({ 
  isOpen,
  selectedDocId = null,
  onSelectDocument = () => {},
  searchTerm = '',
}) => {
  return (
    <Box
      as="aside"
      position="fixed"
      left={0}
      top="64px"
      height="calc(100vh - 64px)"
      width={isOpen ? '288px' : '0'}
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      transition="width 0.3s ease-in-out"
      zIndex={50}
    >
      <DocumentList 
        selectedDocId={selectedDocId}
        onSelectDocument={onSelectDocument}
        searchTerm={searchTerm}
      />
    </Box>
  );
};

export default MainApplicationSidebar; 