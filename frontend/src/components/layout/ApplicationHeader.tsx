import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  IconButton,
  Link,
  HStack,
} from '@chakra-ui/react';
import { Settings, Search, LogOut, Menu as MenuIcon, UserCircle, ChevronRight } from 'lucide-react';
import { generateClient } from 'aws-amplify/api';

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

// AppLogo Component
const AppLogo = () => (
  <RouterLink to="/app/workspace">
    <Heading size="md" color="brand.500">
      Logos
    </Heading>
  </RouterLink>
);

interface BreadcrumbItem {
  id: string;
  title: string;
}

interface ApplicationHeaderProps {
  onSearchChange?: (searchTerm: string) => void;
  searchTerm?: string;
  onToggleSidebar: () => void;
  currentDocumentId?: string;
  documents?: DocumentType[];
}

// Function to build breadcrumb trail
const buildBreadcrumbTrail = (
  documentId: string | undefined,
  documents: DocumentType[] | undefined
): BreadcrumbItem[] => {
  if (!documentId || !documents || documents.length === 0) {
    return [];
  }

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentId: string | null | undefined = documentId;
  
  // Prevent infinite loops (just in case)
  const maxDepth = 10;
  let depth = 0;
  
  while (currentId && depth < maxDepth) {
    const doc = documents.find(d => d.id === currentId);
    if (!doc) break;
    
    // Add to the beginning of the array (reverse order)
    breadcrumbs.unshift({ id: doc.id, title: doc.title });
    
    // Move to parent, if any
    currentId = doc.parentDocumentId;
    depth++;
  }
  
  return breadcrumbs;
};

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  onSearchChange,
  searchTerm = '',
  onToggleSidebar,
  currentDocumentId,
  documents = [],
}) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthenticator();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Generate breadcrumbs
  const breadcrumbs = buildBreadcrumbTrail(currentDocumentId, documents);
  const showBreadcrumbs = breadcrumbs.length > 0;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  // Get user information safely
  const userDisplayName = user?.username || 'User';
  const userInitial = userDisplayName.substring(0, 1).toUpperCase();

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Flex 
      direction="column" 
      width="100%"
    >
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        paddingX={{ base: 4, md: 6 }}
        height="64px"
        bg="white"
        color="gray.800"
        borderBottom="1px"
        borderColor="gray.200"
        position="fixed"
        top="0"
        width="100%"
        zIndex={100}
      >
        <Flex alignItems="center">
          <Box
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="40px"
            h="40px"
            mr={4}
            onClick={onToggleSidebar}
          >
            <MenuIcon size={24} />
          </Box>
          <AppLogo />
        </Flex>

        <Flex alignItems="center" gap={4}>
          <Box width={{ base: '150px', md: '250px', lg: '300px' }} position="relative">
            <Box position="absolute" left="10px" top="50%" transform="translateY(-50%)" zIndex="1">
              <Search size={14} color="#718096" />
            </Box>
            <Input
              type="search"
              placeholder="Search document titles..."
              size="sm"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              borderRadius="md"
              paddingLeft="32px"
            />
          </Box>
          
          {/* User menu dropdown */}
          <Box position="relative" className="user-menu" ref={menuRef}>
            <Box 
              as="button"
              width="36px"
              height="36px"
              borderRadius="full"
              bg="brand.500"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              cursor="pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {userInitial}
            </Box>

            {/* Manually implemented dropdown menu */}
            <Box
              position="absolute"
              top="100%"
              right="0"
              mt="1"
              w="200px"
              bg="white"
              boxShadow="md"
              borderRadius="md"
              zIndex={1000}
              display={isMenuOpen ? "block" : "none"}
              border="1px"
              borderColor="gray.200"
            >
              <Box px={4} py={2}>
                <Text fontWeight="bold">{userDisplayName}</Text>
              </Box>
              <Box 
                as="hr" 
                my={1} 
                borderColor="gray.200"
              />
              <Box 
                as="button"
                display="flex"
                alignItems="center"
                w="full"
                px={4}
                py={2}
                textAlign="left"
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/app/settings');
                }}
              >
                <Settings size={16} style={{ marginRight: '8px' }} />
                <Text>Settings</Text>
              </Box>
              <Box 
                as="hr" 
                my={1} 
                borderColor="gray.200"
              />
              <Box 
                as="button"
                display="flex"
                alignItems="center"
                w="full"
                px={4}
                py={2}
                textAlign="left"
                _hover={{ bg: "gray.100" }}
                color="red.500"
                onClick={handleSignOut}
              >
                <LogOut size={16} style={{ marginRight: '8px' }} />
                <Text>Sign Out</Text>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
      
      {/* Breadcrumbs navigation bar */}
      {showBreadcrumbs && (
        <Flex
          mt="64px"
          px={6}
          py={2}
          borderBottom="1px"
          borderColor="gray.200"
          bg="gray.50"
          alignItems="center"
          fontSize="sm"
          color="gray.600"
          overflowX="auto"
          whiteSpace="nowrap"
        >
          <Box 
            as={RouterLink} 
            to="/app/workspace" 
            _hover={{ color: "brand.500" }}
            fontWeight="medium"
            color="gray.600"
          >
            Documents
          </Box>
          
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id}>
              <Box mx={2} display="inline-block">
                <ChevronRight size={14} />
              </Box>
              {index === breadcrumbs.length - 1 ? (
                <Text fontWeight="medium" color="gray.800">
                  {crumb.title}
                </Text>
              ) : (
                <Box 
                  as={RouterLink} 
                  to={`/app/document/${crumb.id}`} 
                  _hover={{ color: "brand.500" }}
                  color="gray.600"
                >
                  {crumb.title}
                </Box>
              )}
            </React.Fragment>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ApplicationHeader; 