import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  useToken,
  Grid,
  GridItem,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';

// Custom CheckCircle icon since there's an issue with react-feather
const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// Custom Modal implementation since there appears to be an issue with Chakra UI Modal imports
const Modal = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
  if (!isOpen) return null;
  
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.4)"
    >
      {children}
    </Box>
  );
};

const ModalOverlay = () => null; // Not needed with our custom implementation

const ModalContent = ({ children, maxW }: { children: React.ReactNode; maxW?: any }) => (
  <Box
    bg="white"
    borderRadius="md"
    boxShadow="lg"
    width="100%"
    maxWidth={maxW || "500px"}
    m={4}
  >
    {children}
  </Box>
);

const ModalHeader = ({ children, p }: { children: React.ReactNode; p?: any }) => (
  <Box p={p || 4} borderBottomWidth="1px">
    {children}
  </Box>
);

const ModalBody = ({ children, p }: { children: React.ReactNode; p?: any }) => (
  <Box p={p || 4}>
    {children}
  </Box>
);

const ModalFooter = ({ children, p }: { children: React.ReactNode; p?: any }) => (
  <Box p={p || 4} borderTopWidth="1px">
    {children}
  </Box>
);

// Custom Progress component
const Progress = ({ value, size, colorScheme, borderRadius, mt }: 
  { value: number; size?: string; colorScheme?: string; borderRadius?: string; mt?: number }) => (
  <Box 
    mt={mt} 
    w="100%" 
    h={size === "sm" ? "8px" : "16px"} 
    bg="gray.100" 
    borderRadius={borderRadius || "md"}
    overflow="hidden"
  >
    <Box 
      w={`${value}%`} 
      h="100%" 
      bg={colorScheme === "green" ? "green.500" : "blue.500"}
      transition="width 0.3s ease"
    />
  </Box>
);

// Define document type option with icon and description
interface DocumentTypeOption {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
}

// Define user role option with icon and description
interface UserRoleOption {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
}

// Define props for the component
interface NewUserOnboardingProps {
  isOpen: boolean;
  onComplete: (profile: { userRole: string; preferredDocumentTypes: string[] }) => void;
  onSkip: () => void;
}

// Document type options
const documentTypeOptions: DocumentTypeOption[] = [
  {
    id: 'notes',
    label: 'Notes',
    description: 'Quick thoughts and ideas',
  },
  {
    id: 'documents',
    label: 'Documents',
    description: 'Longer form content and reports',
  },
  {
    id: 'research',
    label: 'Research',
    description: 'Academic papers and findings',
  },
  {
    id: 'presentations',
    label: 'Presentations',
    description: 'Slides and visual content',
  },
  {
    id: 'technical',
    label: 'Technical',
    description: 'Code documentation and specs',
  },
  {
    id: 'creative',
    label: 'Creative',
    description: 'Stories, poetry, and creative writing',
  },
];

// User role options
const userRoleOptions: UserRoleOption[] = [
  {
    id: 'student',
    label: 'Student',
    description: 'Taking notes and writing papers',
  },
  {
    id: 'professional',
    label: 'Professional',
    description: 'Creating business documents',
  },
  {
    id: 'researcher',
    label: 'Researcher',
    description: 'Documenting findings and writing papers',
  },
  {
    id: 'writer',
    label: 'Writer',
    description: 'Creating literary works',
  },
  {
    id: 'developer',
    label: 'Developer',
    description: 'Technical documentation and specs',
  },
];

const NewUserOnboarding: React.FC<NewUserOnboardingProps> = ({
  isOpen,
  onComplete,
  onSkip,
}) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>([]);
  const totalSteps = 3;
  const [green500] = useToken('colors', ['green.500']);
  
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // Handle role selection
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  // Handle document type selection/deselection
  const handleDocTypeToggle = (docTypeId: string) => {
    setSelectedDocTypes((prev) => {
      if (prev.includes(docTypeId)) {
        return prev.filter((id) => id !== docTypeId);
      } else {
        return [...prev, docTypeId];
      }
    });
  };

  // Handle next step
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      if (selectedRole) {
        onComplete({
          userRole: selectedRole,
          preferredDocumentTypes: selectedDocTypes,
        });
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle skipping onboarding
  const handleSkip = () => {
    onSkip();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxW={{ base: '90%', md: '800px' }}>
        <ModalHeader p={6}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg" color="gray.800">
              Welcome to Logos
            </Heading>
            <Button variant="ghost" onClick={handleSkip}>
              Skip
            </Button>
          </Flex>
          <Progress
            value={(step / totalSteps) * 100}
            mt={4}
            size="sm"
            colorScheme="green"
            borderRadius="full"
          />
        </ModalHeader>

        <ModalBody p={6}>
          {step === 1 && (
            <Box>
              <Heading size="md" mb={4}>
                Welcome to Logos!
              </Heading>
              <Text mb={6}>
                Logos is a collaborative markdown editor designed to help you create
                beautiful documents. Let's get you set up with a few quick questions.
              </Text>
              <Box textAlign="center" my={10}>
                <Icon as={CheckCircle} w={20} h={20} color="green.500" />
              </Box>
            </Box>
          )}

          {step === 2 && (
            <Box>
              <Heading size="md" mb={4}>
                What best describes your role?
              </Heading>
              <Text mb={6}>This helps us tailor the experience for you.</Text>
              <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4}>
                {userRoleOptions.map((role) => (
                  <GridItem key={role.id}>
                    <Box
                      as="button"
                      p={4}
                      borderWidth={2}
                      borderRadius="md"
                      borderColor={selectedRole === role.id ? 'green.500' : 'gray.200'}
                      bg={selectedRole === role.id ? 'green.50' : 'white'}
                      onClick={() => handleRoleSelect(role.id)}
                      width="100%"
                      height="100%"
                      textAlign="left"
                      transition="all 0.2s"
                      _hover={{ borderColor: 'green.300', bg: 'green.50' }}
                    >
                      <Flex direction="column" gap={2} alignItems="flex-start">
                        <Flex justify="space-between" width="100%">
                          <Text fontWeight="bold">{role.label}</Text>
                          {selectedRole === role.id && (
                            <Icon as={CheckCircle} color={green500} />
                          )}
                        </Flex>
                        <Text fontSize="sm" color="gray.600">
                          {role.description}
                        </Text>
                      </Flex>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          )}

          {step === 3 && (
            <Box>
              <Heading size="md" mb={4}>
                What types of documents will you create?
              </Heading>
              <Text mb={6}>Select all that apply. You can change this later.</Text>
              <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4}>
                {documentTypeOptions.map((docType) => (
                  <GridItem key={docType.id}>
                    <Box
                      as="button"
                      p={4}
                      borderWidth={2}
                      borderRadius="md"
                      borderColor={
                        selectedDocTypes.includes(docType.id) ? 'green.500' : 'gray.200'
                      }
                      bg={selectedDocTypes.includes(docType.id) ? 'green.50' : 'white'}
                      onClick={() => handleDocTypeToggle(docType.id)}
                      width="100%"
                      height="100%"
                      textAlign="left"
                      transition="all 0.2s"
                      _hover={{ borderColor: 'green.300', bg: 'green.50' }}
                    >
                      <Flex direction="column" gap={2} alignItems="flex-start">
                        <Flex justify="space-between" width="100%">
                          <Text fontWeight="bold">{docType.label}</Text>
                          {selectedDocTypes.includes(docType.id) && (
                            <Icon as={CheckCircle} color={green500} />
                          )}
                        </Flex>
                        <Text fontSize="sm" color="gray.600">
                          {docType.description}
                        </Text>
                      </Flex>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          )}
        </ModalBody>

        <ModalFooter p={6}>
          <Flex width="100%" justifyContent="space-between" gap={4}>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              colorScheme="green"
              onClick={handleNext}
              disabled={step === 2 && !selectedRole}
            >
              {step === totalSteps ? 'Complete' : 'Next'}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewUserOnboarding; 