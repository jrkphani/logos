import React from 'react';
import { Heading, Text, Box, Button as ChakraButton, VStack, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <VStack spacing={8} textAlign="center" py={10}>
      <Heading as="h1" size="2xl" color="brand.500">
        Logos: Craft Winning Sales Documents, Intelligently.
      </Heading>
      <Text fontSize="lg" color="gray.600" maxW="3xl">
        In today's fast-paced sales environment, the ability to create compelling, accurate, and
        (asynchronously) collaborative proposals, case studies, and scripts quickly is paramount. Logos redefines
        how your sales team operates and innovates by transforming your document creation workflow.
      </Text>
      
      <Box>
        <Heading as="h2" size="xl" mt={10} mb={4}>The Logos Advantage</Heading>
        <Text color="gray.500">
          People, AI-Driven Prompts, and Intuitive Technology.
          <ChakraLink as={RouterLink} to="/philosophy" color="brand.500" fontWeight="semibold" ml={2}>
             Explore Our Vision &rarr;
          </ChakraLink>
        </Text>
        {/* Add feature highlights here later with Chakra Cards or Flex layouts */}
      </Box>

      <HStack spacing={4} mt={8}>
        <ChakraButton as={RouterLink} to="/app/workspace" colorScheme="brand" size="lg">
          Get Started (Sign Up)
        </ChakraButton>
        <ChakraButton as={RouterLink} to="/app/workspace" variant="outline" colorScheme="brand" size="lg">
          Login
        </ChakraButton>
      </HStack>
    </VStack>
  );
};

// Export as default AND as a named export to support both import methods
export { HomePage };
export default HomePage; 