import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { Settings, Search, LogOut, Menu as MenuIcon, UserCircle } from 'lucide-react';

// AppLogo Component
const AppLogo = () => (
  <RouterLink to="/app/workspace">
    <Heading size="md" color="brand.500">
      Logos
    </Heading>
  </RouterLink>
);

interface ApplicationHeaderProps {
  onSearchChange?: (searchTerm: string) => void;
  searchTerm?: string;
  onToggleSidebar: () => void;
}

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  onSearchChange,
  searchTerm = '',
  onToggleSidebar,
}) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthenticator();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
  );
};

export default ApplicationHeader; 