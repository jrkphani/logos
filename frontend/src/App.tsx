import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Default Amplify UI styles
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../backend/amplify/data/resource';
import type {
  UserProfile,
  CreateUserProfileInput,
  UpdateUserProfileInput
} from '../../backend/src/API';

// Direct imports for layouts
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

// Handle imports with React.lazy to avoid TS2307 errors
// We're using a simplified approach here that doesn't rely on named exports
const PublicLayout = React.lazy(() => import('./layouts/PublicLayout'));
const HomePage = React.lazy(() => import('./pages/public/HomePage'));
const PhilosophyPage = React.lazy(() => import('./pages/public/PhilosophyPage'));

import WorkspacePage from './pages/app/WorkspacePage';
import DocumentEditorPage from './pages/app/DocumentEditorPage';
import SettingsPage from './pages/app/SettingsPage';
import NewUserOnboarding from './components/NewUserOnboarding';

// Generate the API client for backend operations
const client = generateClient<Schema>();

// This component will render the UI for authenticated users inside AuthenticatedLayout
function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="workspace" element={<WorkspacePage />} />
      <Route path="workspace/doc/:docId" element={<DocumentEditorPage />} />
      <Route path="settings" element={<SettingsPage />} />
      {/* Default route within /app */}
      <Route index element={<Navigate to="workspace" replace />} />
      {/* Catch-all for any other /app routes */}
      <Route path="*" element={<Navigate to="workspace" replace />} />
    </Routes>
  );
}

// Wrap the main application content with proper context
function AppContent() {
  // Get the authentication state from Amplify
  const { route } = useAuthenticator((context) => [context.route]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if onboarding is complete when user logs in
  useEffect(() => {
    if (route === 'authenticated') {
      const onboardingComplete = localStorage.getItem('logos-onboarding-complete');
      if (onboardingComplete !== 'true') {
        setShowOnboarding(true);
      }
    }
  }, [route]);

  const handleOnboardingComplete = async (profile: { userRole: string; preferredDocumentTypes: string[] }) => {
    console.log('Onboarding completed with profile:', profile);
    
    try {
      // Get current authenticated user
      const cognitoUser = await getCurrentUser();
      const userId = cognitoUser.userId; // This is the user's unique Cognito sub ID

      if (!userId) {
        throw new Error("User ID (sub) not found. Cannot save profile.");
      }

      // Prepare the data for saving
      const userProfileData: Omit<CreateUserProfileInput, 'userId'> = {
        userRole: profile.userRole,
        preferredDocumentTypes: profile.preferredDocumentTypes,
      };

      // Try to get existing profile to decide between create or update
      let existingProfile: UserProfile | null = null;
      try {
        // @ts-ignore - Type mismatch between Schema and client models
        const { data, errors } = await client.models.UserProfile.get({ userId });
        if (errors) {
          const notFoundError = errors.find((e: any) => 
            e.message.toLowerCase().includes('not found') || 
            e.message.toLowerCase().includes('conditionalcheckfailedexception')
          );
          if (!notFoundError) {
            console.error('Error fetching existing user profile:', errors);
            throw new Error(errors.map((e: any) => e.message).join('\n'));
          }
        }
        existingProfile = data || null;
      } catch (fetchError: any) {
        if (!fetchError.message?.toLowerCase().includes('not found') && 
            !fetchError.message?.toLowerCase().includes('conditionalcheckfailedexception')) {
          console.error('Exception fetching user profile:', fetchError);
        } else {
          console.log("No existing profile found for user, will create.");
        }
      }

      if (existingProfile) {
        // Update existing profile
        const updateInput: UpdateUserProfileInput = {
          userId,
          ...userProfileData,
        };
        // @ts-ignore - Type mismatch between Schema and client models
        const { data: updatedProfile, errors: updateErrors } = await client.models.UserProfile.update(updateInput);
        if (updateErrors || !updatedProfile) {
          throw new Error(updateErrors?.map((e: any) => e.message).join('\n') || "Failed to update user profile.");
        }
        console.log('User profile updated:', updatedProfile);
        console.log("Preferences Updated: Your preferences have been successfully updated.");
      } else {
        // Create new profile
        const createInput: CreateUserProfileInput = {
          userId,
          ...userProfileData,
        };
        // @ts-ignore - Type mismatch between Schema and client models
        const { data: newProfile, errors: createErrors } = await client.models.UserProfile.create(createInput);
        if (createErrors || !newProfile) {
          throw new Error(createErrors?.map((e: any) => e.message).join('\n') || "Failed to create user profile.");
        }
        console.log('User profile created:', newProfile);
        console.log("Preferences Saved: Your preferences have been successfully saved.");
      }

      // Always store in localStorage for immediate UI use
      localStorage.setItem('logos-onboarding-complete', 'true');
      localStorage.setItem('logos-user-role', profile.userRole);
      localStorage.setItem('logos-document-types', JSON.stringify(profile.preferredDocumentTypes));
      setShowOnboarding(false);
      
      return true; // Indicate success
      
    } catch (err: any) {
      console.error('Error saving user profile to backend:', err);
      console.error("Error Saving Preferences:", err.message || "Could not save your preferences to the cloud.");
      // Still mark as complete locally to avoid re-prompt loop
      localStorage.setItem('logos-onboarding-complete', 'true');
      setShowOnboarding(false);
      return false; // Indicate failure
    }
  };

  const handleOnboardingSkip = () => {
    // Mark onboarding as complete but don't save preferences
    localStorage.setItem('logos-onboarding-complete', 'true');
    setShowOnboarding(false);
    
    console.log("Onboarding Skipped: You can update your preferences later in Settings.");
  };

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes use PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          {/* Example for published document later: 
          <Route path="/published/:documentId" element={<PublishedDocumentPage />} /> 
          */}
        </Route>

        {/* Authenticated Routes are prefixed with /app and wrapped by Authenticator & AuthenticatedLayout */}
        <Route
          path="/app/*" // This will match /app, /app/workspace, /app/workspace/doc/some-id, etc.
          element={
            <Authenticator>
              {/* Authenticator will render its UI if user is not signed in */}
              {/* If user is signed in, it will render its children */}
              <AuthenticatedLayout>
                <AuthenticatedRoutes /> {/* Nested routes for the authenticated part of the app */}
              </AuthenticatedLayout>
            </Authenticator>
          }
        />
        
        {/* Fallback/Redirect Logic:
            - If user is authenticated and hits a non-app route (like '/'), redirect to '/app/workspace'.
            - If user is not authenticated and hits a non-public route, Authenticator for /app/* handles it.
              For any other unknown route, redirect to public home.
        */}
        <Route 
          path="*" 
          element={
            route === 'authenticated' ? 
            <Navigate to="/app/workspace" replace /> : 
            <Navigate to="/" replace /> 
          } 
        />
      </Routes>

      {/* Onboarding Modal */}
      <NewUserOnboarding 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete} 
        onSkip={handleOnboardingSkip} 
      />
    </React.Suspense>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <AppContent />
    </Authenticator.Provider>
  );
}

export default App;
