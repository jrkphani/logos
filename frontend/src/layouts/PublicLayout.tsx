import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Button as ChakraButton, Text } from '@chakra-ui/react'; // Using Chakra UI

// Placeholder Logo component
const Logo = () => (
  <RouterLink to="/">
    <Heading size="lg" color="brand.500"> {/* Use your theme's brand color */}
      Logos
    </Heading>
  </RouterLink>
);

const PublicSiteHeader = () => {
  return (
    <Box as="header" bg="white" borderBottom="1px" borderColor="gray.200" px={6} py={3}>
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        <Logo />
        <Flex alignItems="center">
          <ChakraButton as={RouterLink} to="/philosophy" variant="ghost" mr={4}>
            Our Philosophy
          </ChakraButton>
          <ChakraButton as={RouterLink} to="/app/workspace" variant="outline" colorScheme="brand" mr={2} size="sm">
            Login
          </ChakraButton>
          <ChakraButton as={RouterLink} to="/app/workspace" colorScheme="brand" size="sm"> {/* Sign Up will be handled by Authenticator */}
            Sign Up
          </ChakraButton>
        </Flex>
      </Flex>
    </Box>
  );
};

const PublicSiteFooter = () => {
  return (
    <Box as="footer" borderTop="1px" borderColor="gray.200" py={6} mt={10}>
      <Text textAlign="center" fontSize="sm" color="gray.600">
        &copy; {new Date().getFullYear()} Logos. All rights reserved. 
        <RouterLink to="/philosophy" style={{ marginLeft: '10px', textDecoration: 'underline' }}>
          Our Philosophy
        </RouterLink>
      </Text>
    </Box>
  );
};

const PublicLayout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <PublicSiteHeader />
      <Box as="main" flex="1" py={8} px={6} maxW="container.xl" mx="auto" width="full">
        <Outlet /> {/* Child public page components render here */}
      </Box>
      <PublicSiteFooter />
    </Flex>
  );
};

// Export as default AND as a named export to support both import methods
export { PublicLayout };
export default PublicLayout; 