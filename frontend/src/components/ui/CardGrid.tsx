import { SimpleGrid, type SimpleGridProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface CardGridProps extends Omit<SimpleGridProps, 'columns'> {
  children: ReactNode;
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xlg?: number;
  };
}

/**
 * CardGrid component for responsive card layouts
 * Based on IBM Carbon Design System grid principles
 */
const CardGrid = ({ 
  children, 
  columns = { 
    base: 1, 
    md: 2, 
    lg: 3 
  }, 
  ...rest 
}: CardGridProps) => {
  return (
    <SimpleGrid
      columns={{
        base: columns.base,
        sm: columns.sm,
        md: columns.md,
        lg: columns.lg,
        xl: columns.xlg,
      }}
      {...rest}
    >
      {children}
    </SimpleGrid>
  );
};

export default CardGrid; 