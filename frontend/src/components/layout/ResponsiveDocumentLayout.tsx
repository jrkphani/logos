import {
  Box,
  Button,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Maximize2, Minimize2, ChevronRight, ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { grid } from '../../styles/responsive';

interface ResponsiveDocumentLayoutProps {
  navigation: ReactNode;
  editor: ReactNode;
  copilot: ReactNode;
}

/**
 * ResponsiveDocumentLayout implements the Logos editor layout with responsive behavior:
 * - Mobile (sm): Full-width editor with bottom sheet for Markdown Copilot
 * - Tablet (md): Editor with collapsible right sidebar (320px)
 * - Desktop (lg+): Editor with persistent sidebars
 *   - Left sidebar: 256px (navigation)
 *   - Right sidebar: 384px (Copilot)
 *   - Main content: Flexible width
 */
const ResponsiveDocumentLayout = ({
  navigation,
  editor,
  copilot,
}: ResponsiveDocumentLayoutProps) => {
  // Controls for right sidebar (copilot)
  const { open: isCopilotOpen, onToggle: toggleCopilot } = useDisclosure({ defaultOpen: true });
  
  // Responsive behavior
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  
  // Sidebar widths based on screen size
  const navWidth = useBreakpointValue({
    lg: grid.sidebarWidths.lg,
  });
  
  const copilotWidth = useBreakpointValue({
    md: grid.copilotWidths.md,
    lg: grid.copilotWidths.lg,
  });

  return (
    <Flex h="100vh" position="relative" overflow="hidden">
      {/* Navigation - always visible on desktop, hidden on mobile/tablet */}
      {isDesktop && (
        <Box
          as="aside"
          w={navWidth}
          h="100%"
          borderRightWidth="1px"
          overflowY="auto"
          display={{ base: 'none', lg: 'block' }}
        >
          {navigation}
        </Box>
      )}

      {/* Main editor area */}
      <Box
        as="main"
        flex="1"
        h="100%"
        overflowY="auto"
        pl={{ base: 0, lg: 0 }}
        pr={{ base: 0, md: isCopilotOpen ? copilotWidth : 0 }}
        transition="padding 0.3s ease"
      >
        <Flex 
          direction="column" 
          h="100%"
          position="relative"
          maxW="960px" // Optimal line length for readability
          mx="auto"
          px={4}
        >
          {editor}

          {/* Toggle button for copilot sidebar on tablet/desktop */}
          {!isMobile && (
            <Box
              position="absolute"
              top="50%"
              right={0}
              transform="translateY(-50%)"
              zIndex={2}
              borderRadius="md"
              borderLeftRadius="full"
              bg="brand.500"
              color="white"
              boxShadow="md"
              _hover={{ bg: "brand.hover" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="32px"
              height="48px"
              cursor="pointer"
              onClick={toggleCopilot}
            >
              {isCopilotOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Box>
          )}
        </Flex>
      </Box>

      {/* Copilot sidebar - full-width bottom sheet on mobile */}
      {isMobile ? (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          h="50vh"
          bg="white"
          borderTopWidth="1px"
          borderTopRadius="md"
          boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
          transform={isCopilotOpen ? "translateY(0)" : "translateY(100%)"}
          transition="transform 0.3s ease"
          zIndex={10}
        >
          <Flex justify="center" borderBottomWidth="1px" p={2}>
            <Box
              as="button"
              aria-label={isCopilotOpen ? "Minimize copilot" : "Maximize copilot"}
              bg="brand.500"
              color="white"
              _hover={{ bg: "brand.hover" }}
              borderRadius="md"
              py={1}
              px={3}
              onClick={toggleCopilot}
              display="flex"
              alignItems="center"
              gap={2}
            >
              {isCopilotOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              <Box>{isCopilotOpen ? "Minimize" : "Maximize"}</Box>
            </Box>
          </Flex>
          <Box p={4} h="calc(100% - 50px)" overflowY="auto">
            {copilot}
          </Box>
        </Box>
      ) : (
        // Sidebar for tablet/desktop
        <Box
          as="aside"
          position="fixed"
          top={0}
          right={0}
          h="100%"
          w={copilotWidth}
          bg="white"
          borderLeftWidth="1px"
          transform={isCopilotOpen ? "translateX(0)" : "translateX(100%)"}
          transition="transform 0.3s ease"
          zIndex={5}
          overflowY="auto"
        >
          {copilot}
        </Box>
      )}
    </Flex>
  );
};

export default ResponsiveDocumentLayout; 