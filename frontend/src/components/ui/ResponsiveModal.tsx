import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  type ModalProps as ChakraModalProps,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface ResponsiveModalProps extends Omit<ChakraModalProps, 'children'> {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * ResponsiveModal component implements Carbon-inspired responsive behavior:
 * - Mobile (sm): Full-screen or bottom sheet
 * - Tablet (md): Centered modal, 90% width
 * - Desktop (lg+): Centered modal, max-width 640px
 */
const ResponsiveModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  ...rest
}: ResponsiveModalProps) => {
  // Responsive behavior
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Responsive size properties
  const size = useBreakpointValue({ base: 'full', md: '90%', lg: 'xl' });
  const motionPreset = useBreakpointValue({ 
    base: 'slideInBottom', 
    md: 'slideInRight',
    lg: 'scale',
  });

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size={size}
      motionPreset={motionPreset as any}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        borderRadius={isMobile ? '0' : 'md'}
        mt={isMobile ? '0' : '10vh'}
        mb={isMobile ? '0' : '10vh'}
        h={isMobile ? '100vh' : 'auto'}
        maxW={{ base: '100%', md: '90%', lg: '640px' }}
      >
        {title && (
          <ModalHeader borderBottomWidth="1px">
            {title}
            <ModalCloseButton />
          </ModalHeader>
        )}
        
        <ModalBody p={{ base: 4, lg: 6 }}>
          {children}
        </ModalBody>

        {footer && (
          <ModalFooter borderTopWidth="1px">
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResponsiveModal; 