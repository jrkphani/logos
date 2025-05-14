import { Box, type BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { mediaQueries, grid, spacing } from '../../styles/responsive';

interface ContainerProps extends BoxProps {
  children: ReactNode;
  fluid?: boolean;
}

/**
 * Container component that provides responsive padding and max-width
 * based on the Carbon Design System grid
 */
const Container = ({ children, fluid = false, ...rest }: ContainerProps) => {
  return (
    <Box
      w="100%"
      maxW={fluid ? '100%' : grid.containerWidths.lg}
      mx="auto"
      px={{ 
        base: spacing['05'],
        md: spacing['05'],
        lg: spacing['07']
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Container; 