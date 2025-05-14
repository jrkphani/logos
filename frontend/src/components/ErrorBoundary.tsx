import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true, 
      error, 
      errorInfo: null 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('Component Error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use that
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Otherwise use the default error UI
      return (
        <Box 
          p={6} 
          m={4} 
          bg="red.50" 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor="red.300"
        >
          <Heading size="md" color="red.600" mb={4}>
            Something went wrong
          </Heading>
          <Text mb={4}>
            There was an error rendering this component. Try refreshing the page or navigating back.
          </Text>
          {this.state.error && (
            <Box 
              p={3} 
              bg="white" 
              borderRadius="md" 
              borderWidth="1px" 
              borderColor="gray.200"
              mb={4}
              overflowX="auto"
            >
              <Text fontFamily="mono" fontSize="sm" whiteSpace="pre-wrap">
                {this.state.error.toString()}
              </Text>
            </Box>
          )}
          <Button 
            colorScheme="red" 
            onClick={this.handleReset}
            size="sm"
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 