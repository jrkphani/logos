import React from 'react';
import { Box, Heading, Text, Input, Button, Flex, Switch } from '@chakra-ui/react';
import { useAuthenticator } from '@aws-amplify/ui-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future implementation will save settings to backend
    console.log('Settings saved');
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Settings</Heading>
      <Text mb={8}>Customize your Logos experience, {user?.username || 'User'}.</Text>
      
      <Box bg="white" p={6} borderRadius="md" shadow="sm">
        <Box as="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={6}>
          <Box>
            <Box as="label" display="block" mb={2} fontWeight="medium">Display Name</Box>
            <Input placeholder="Your name" defaultValue={user?.username || 'User'} />
          </Box>
          
          <Box>
            <Box as="label" display="block" mb={2} fontWeight="medium">Email</Box>
            <Input 
              placeholder="Your email" 
              defaultValue={user?.attributes?.email || 'user@example.com'} 
              type="email" 
              isReadOnly
            />
          </Box>
          
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight="medium">Enable Autosave</Text>
            <Switch defaultChecked id="autosave" size="lg" colorScheme="brand" />
          </Flex>
          
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight="medium">Enable Spell Check</Text>
            <Switch defaultChecked id="spellcheck" size="lg" colorScheme="brand" />
          </Flex>
          
          <Box>
            <Button 
              type="submit"
              variant="solid" 
              bg="brand.500" 
              color="white" 
              _hover={{ bg: "brand.hover" }}
              size="md"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage; 