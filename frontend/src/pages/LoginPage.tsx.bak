import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  Container
} from '@chakra-ui/react';

interface LoginPageProps {
  onSignIn: (username: string, password: string) => Promise<void>;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    
    setIsLoading(true);
    try {
      await onSignIn(username, password);
    } catch (err) {
      // Error will be handled by the parent component
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="100%" height="100vh" centerContent>
      <Flex width="100%" height="100%" align="center" justify="center">
        <Box
          p={8}
          width={{ base: '90%', md: '400px' }}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
          border="1px"
          borderColor="gray.200"
        >
          <Stack gap={6} align="stretch">
            <Box textAlign="center">
              <Heading size="lg" mb={2}>Welcome to Logos</Heading>
              <Text color="gray.500">Sign in to access your documents</Text>
            </Box>
            
            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Box>
                  <Text fontWeight="medium" mb={1} display="block">
                    Email
                  </Text>
                  <Input
                    id="username"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                    borderColor={error ? "red.500" : "gray.200"}
                  />
                </Box>
                
                <Box>
                  <Text fontWeight="medium" mb={1} display="block">
                    Password
                  </Text>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    autoComplete="current-password"
                    borderColor={error ? "red.500" : "gray.200"}
                  />
                  {error && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {error}
                    </Text>
                  )}
                </Box>
                
                <Button
                  width="full"
                  colorScheme="green"
                  bg="#07422B"
                  _hover={{ bg: "#3D7359" }}
                  type="submit"
                  disabled={isLoading}
                  mt={4}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Stack>
            </form>
            
            <Box textAlign="center" mt={4}>
              <Text fontSize="sm">
                Don't have an account?{' '}
                <Link color="brand.500" href="#signup">
                  Sign up
                </Link>
              </Text>
              <Text fontSize="sm" mt={2}>
                <Link color="brand.500" href="#reset-password">
                  Forgot password?
                </Link>
              </Text>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default LoginPage; 