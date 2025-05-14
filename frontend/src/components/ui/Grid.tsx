import { Grid as ChakraGrid, type GridProps as ChakraGridProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { grid, spacing as spacingTokens } from '../../styles/responsive';

interface GridProps extends ChakraGridProps {
  children: ReactNode;
  columns?: { 
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xlg?: number;
  };
  spacing?: string | { 
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xlg?: string;
  };
}

/**
 * Grid component that provides responsive grid layouts
 * based on the Carbon Design System grid
 */
const Grid = ({ 
  children, 
  columns = { 
    base: 1,
    md: 2,
    lg: 3
  }, 
  spacing = {
    base: spacingTokens['05'],
    lg: spacingTokens['07']
  },
  ...rest 
}: GridProps) => {
  const getTemplateColumns = () => {
    return {
      base: `repeat(${columns.base || 1}, 1fr)`,
      sm: columns.sm ? `repeat(${columns.sm}, 1fr)` : undefined,
      md: columns.md ? `repeat(${columns.md}, 1fr)` : undefined,
      lg: columns.lg ? `repeat(${columns.lg}, 1fr)` : undefined,
      xlg: columns.xlg ? `repeat(${columns.xlg}, 1fr)` : undefined,
    };
  };

  const getGap = () => {
    if (typeof spacing === 'string') {
      return spacing;
    }
    
    return {
      base: spacing.base || spacingTokens['05'],
      sm: spacing.sm,
      md: spacing.md,
      lg: spacing.lg || spacingTokens['07'],
      xlg: spacing.xlg,
    };
  };

  return (
    <ChakraGrid
      templateColumns={getTemplateColumns()}
      gap={getGap()}
      {...rest}
    >
      {children}
    </ChakraGrid>
  );
};

export default Grid; 