import { Heading, Text, type HeadingProps, type TextProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { typography } from '../../styles/responsive';

// Heading component props
interface ResponsiveHeadingProps extends HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Text component props
interface ResponsiveTextProps extends TextProps {
  children: ReactNode;
  variant?: 'regular' | 'small' | 'caption';
}

/**
 * ResponsiveHeading component
 * Implements responsive typography based on IBM Carbon Design System
 */
export const ResponsiveHeading = ({ 
  children, 
  level = 2,
  ...rest 
}: ResponsiveHeadingProps) => {
  // Map heading levels to font sizes
  const getFontSizes = () => {
    switch (level) {
      case 1:
        return {
          base: typography.headings.h1.sm,
          md: typography.headings.h1.md,
          lg: typography.headings.h1.lg,
        };
      case 2:
        return {
          base: typography.headings.h2.sm,
          md: typography.headings.h2.md,
          lg: typography.headings.h2.lg,
        };
      case 3:
        return {
          base: typography.headings.h3.sm,
          md: typography.headings.h3.md,
          lg: typography.headings.h3.lg,
        };
      case 4:
        return {
          base: typography.headings.h4.sm,
          md: typography.headings.h4.md,
          lg: typography.headings.h4.lg,
        };
      default:
        return {
          base: '1rem',
        };
    }
  };

  // Map heading levels to line height
  const getLineHeight = () => {
    switch (level) {
      case 1:
        return typography.headings.h1.lineHeight;
      case 2:
        return typography.headings.h2.lineHeight;
      case 3:
        return typography.headings.h3.lineHeight;
      case 4:
        return typography.headings.h4.lineHeight;
      default:
        return 1.5;
    }
  };

  return (
    <Heading
      as={`h${level}` as any}
      fontSize={getFontSizes()}
      lineHeight={getLineHeight()}
      {...rest}
    >
      {children}
    </Heading>
  );
};

/**
 * ResponsiveText component
 * Implements responsive body text based on IBM Carbon Design System
 */
export const ResponsiveText = ({ 
  children, 
  variant = 'regular',
  ...rest 
}: ResponsiveTextProps) => {
  // Get font size based on variant
  const getFontSize = () => {
    switch (variant) {
      case 'regular':
        return typography.body.regular.fontSize;
      case 'small':
        return typography.body.small.fontSize;
      case 'caption':
        return typography.body.caption.fontSize;
      default:
        return typography.body.regular.fontSize;
    }
  };

  // Get line height based on variant
  const getLineHeight = () => {
    switch (variant) {
      case 'regular':
        return typography.body.regular.lineHeight;
      case 'small':
        return typography.body.small.lineHeight;
      case 'caption':
        return typography.body.caption.lineHeight;
      default:
        return typography.body.regular.lineHeight;
    }
  };

  return (
    <Text
      fontSize={getFontSize()}
      lineHeight={getLineHeight()}
      maxWidth={typography.optimalLineLength}
      {...rest}
    >
      {children}
    </Text>
  );
}; 