import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Menu, X } from 'lucide-react';
import { useEffect } from 'react';
import { grid, mediaQueries } from '../../styles/responsive';

interface ResponsiveNavigationProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * ResponsiveNavigation component that implements Carbon-inspired responsive behavior:
 * - Mobile (sm): Hamburger menu with full-screen overlay
 * - Tablet (md): Collapsible sidebar (240px width)
 * - Desktop (lg+): Persistent sidebar (256px width)
 */
const ResponsiveNavigation = ({ children, title = 'Logos' }: ResponsiveNavigationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isPersistent = useBreakpointValue({ base: false, lg: true });
  
  const sidebarWidth = useBreakpointValue({
    base: '100%',
    md: grid.sidebarWidths.md,
    lg: grid.sidebarWidths.lg,
  });

  // Close drawer when switching to desktop view
  useEffect(() => {
    if (isPersistent && isOpen) {
      onClose();
    }
  }, [isPersistent, isOpen, onClose]);

  return (
    <Flex width="100%" height="100%">
      {/* Mobile/Tablet toggle button */}
      {!isPersistent && (
        <IconButton
          aria-label="Open navigation"
          icon={<Menu />}
          position="fixed"
          top="4"
          left="4"
          zIndex="overlay"
          onClick={onOpen}
          display={{ base: 'flex', lg: 'none' }}
        />
      )}

      {/* Drawer for mobile/tablet */}
      {!isPersistent && (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size={isMobile ? 'full' : 'xs'}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              {title}
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody p={0}>{children}</DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      {/* Persistent sidebar for desktop */}
      {isPersistent && (
        <Box
          as="aside"
          width={sidebarWidth}
          height="100vh"
          borderRightWidth="1px"
          position="fixed"
          top="0"
          left="0"
          overflowY="auto"
        >
          <Box p={4} borderBottomWidth="1px">
            {title}
          </Box>
          <Box>{children}</Box>
        </Box>
      )}

      {/* Main content area with appropriate margin for persistent sidebar */}
      <Box
        as="main"
        flex="1"
        ml={{ base: 0, lg: grid.sidebarWidths.lg }}
        transition="margin-left 0.3s"
        width={{ base: '100%', lg: `calc(100% - ${grid.sidebarWidths.lg})` }}
      />
    </Flex>
  );
};

export default ResponsiveNavigation; 