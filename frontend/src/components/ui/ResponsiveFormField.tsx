import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  useBreakpointValue,
  type FormControlProps,
  type InputProps,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface ResponsiveFormFieldProps extends FormControlProps {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
  inputProps?: InputProps;
  children?: ReactNode;
}

/**
 * ResponsiveFormField component implements Carbon-inspired responsive behavior:
 * - Mobile (sm): Full-width inputs with stacked labels
 * - Tablet/Desktop (md+): Optional inline labels with max width inputs
 */
const ResponsiveFormField = ({
  id,
  label,
  helperText,
  error,
  inputProps,
  children,
  ...rest
}: ResponsiveFormFieldProps) => {
  // Responsive behavior
  const isMobile = useBreakpointValue({ base: true, md: false });
  const direction = useBreakpointValue({ base: 'column', md: 'row' });
  const inputWidth = useBreakpointValue({ 
    base: '100%',
    md: '320px',
    lg: '480px',
  });

  return (
    <FormControl 
      id={id}
      isInvalid={!!error}
      mb={4}
      {...rest}
    >
      <Box 
        display="flex" 
        flexDirection={direction}
        alignItems={direction === 'row' ? 'center' : 'flex-start'}
      >
        <FormLabel 
          fontSize={isMobile ? '16px' : '14px'} 
          mb={direction === 'row' ? 0 : 2}
          minWidth={direction === 'row' ? '180px' : 'auto'}
        >
          {label}
        </FormLabel>
        
        <Box width={inputWidth}>
          {children || (
            <Input
              size={isMobile ? 'lg' : 'md'}
              fontSize={isMobile ? '16px' : 'inherit'}
              {...inputProps}
            />
          )}
          
          {helperText && !error && (
            <FormHelperText>{helperText}</FormHelperText>
          )}
          
          {error && (
            <FormErrorMessage>{error}</FormErrorMessage>
          )}
        </Box>
      </Box>
    </FormControl>
  );
};

export default ResponsiveFormField; 