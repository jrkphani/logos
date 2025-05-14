import React from 'react';
import { Heading, Text, Box, VStack } from '@chakra-ui/react';

const PhilosophyPage = () => {
  return (
    <VStack spacing={6} align="stretch" maxW="container.md" mx="auto">
      <Heading as="h1" size="xl" textAlign="center" color="brand.500">
        Project Kairos: Our Guiding Philosophy
      </Heading>
      <Text>
        Embark on a journey of organizational evolution with Logos. We believe that the written word 
        is the foundation of great sales, marketing, and customer relationships.
      </Text>
      <Heading as="h2" size="lg" mt={8} color="brand.500">Our Vision</Heading>
      <Text>
        Logos transforms how sales teams create, collaborate on, and perfect their documents. By 
        combining collaborative editing with AI-powered assistance, we make it simple to craft 
        compelling proposals, case studies, and scripts that win deals.
      </Text>
      <Heading as="h2" size="lg" mt={8} color="brand.500">Our Values</Heading>
      <Text>
        • <strong>Simplicity</strong>: We believe tools should get out of the way and let your ideas shine.<br />
        • <strong>Collaboration</strong>: Great documents are rarely created alone.<br />
        • <strong>Intelligence</strong>: AI should amplify human creativity, not replace it.<br />
        • <strong>Clarity</strong>: Clear writing leads to clear understanding and successful outcomes.
      </Text>
    </VStack>
  );
};

// Export as default AND as a named export to support both import methods
export { PhilosophyPage };
export default PhilosophyPage; 