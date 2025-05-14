import React, { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import ApplicationHeader from '../components/layout/ApplicationHeader';
import MainApplicationSidebar from '../components/layout/MainApplicationSidebar';

// Context type for child routes (pages)
export interface AppOutletContextType {
  searchTerm: string;
  selectedDocId: string | null;
  selectDocument: (docId: string, s3Key?: string | null, title?: string) => void;
  createNewDocument: () => void;
}

interface AuthenticatedLayoutProps {
  children?: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen]);

  const handleSelectDocument = useCallback((docId: string, s3Key?: string | null, title?: string) => {
    setSelectedDocId(docId);
    // Navigate to the document editor with the selected document ID
    navigate(`/app/workspace/doc/${docId}`);
  }, [navigate]);

  // Note: We don't need to implement createNewDocument here anymore
  // since it's fully implemented in the DocumentList component

  return (
    <Box minHeight="100vh" bg="gray.50" position="relative">
      <ApplicationHeader 
        onToggleSidebar={toggleSidebar} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <MainApplicationSidebar 
        isOpen={sidebarOpen} 
        selectedDocId={selectedDocId}
        onSelectDocument={handleSelectDocument}
        searchTerm={searchTerm}
      />
      
      <Box
        as="main"
        marginLeft={sidebarOpen ? '288px' : '0'}
        marginTop="64px"
        paddingTop="24px"
        paddingX="24px"
        paddingBottom="24px"
        minHeight="calc(100vh - 64px)"
        transition="margin-left 0.3s ease-in-out"
        position="relative"
        zIndex="1"
        overflow="auto"
      >
        {children || (
          <Outlet context={{ 
            searchTerm, 
            selectedDocId, 
            selectDocument: handleSelectDocument,
            // Placeholder - this function is no longer used from the context
            // since the DocumentList component handles creation
            createNewDocument: () => {} 
          } satisfies AppOutletContextType} />
        )}
      </Box>
    </Box>
  );
};

export default AuthenticatedLayout; 