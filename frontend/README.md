# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Logos Frontend Application

## User Onboarding Implementation

This document describes the implementation of the New User Onboarding flow in the Logos application with backend integration to AWS Amplify and DynamoDB.

### Overview

The onboarding flow collects user role and preferred document type preferences during the first login. This data is saved to the user's profile in DynamoDB via AWS AppSync.

### Key Components

1. **NewUserOnboarding.tsx**: A multi-step modal component that collects user preferences.
2. **App.tsx**: Contains the logic for displaying the onboarding flow and saving data to the backend.

### Data Flow

1. When a user logs in for the first time, App.tsx checks `localStorage` for an 'onboarding-complete' flag.
2. If not completed, the onboarding modal is displayed.
3. On completion:
   - The user preferences are saved to DynamoDB in a UserProfile record.
   - Local storage flags are set to prevent showing the onboarding again.
4. On skip:
   - Only the local storage flag is set; no backend data is saved.

### Backend Integration

The user profile data is saved to a UserProfile model in DynamoDB with the following structure:

```typescript
UserProfile: {
  userId: string; // Primary key - the Cognito user's sub ID
  userRole: string; // The selected role (e.g., 'student', 'professional')
  preferredDocumentTypes: string[]; // Array of selected document types
}
```

The `handleOnboardingComplete` function in App.tsx:
1. Gets the current authenticated user ID
2. Checks if a UserProfile already exists
3. Creates a new profile or updates an existing one
4. Provides user feedback via toasts
5. Sets localStorage flags for immediate UI use

### Error Handling

The implementation includes comprehensive error handling:
- API call errors are caught and displayed to the user
- Authentication errors prompt re-login
- Missing user ID errors display appropriate messages

### Local Data Cache

For performance and offline use, user preferences are stored in localStorage:
- `logos-onboarding-complete`: Flag to prevent reshowing onboarding
- `logos-user-role`: The selected user role
- `logos-document-types`: JSON stringified array of document types

## Development Notes

### Custom UI Components

The implementation includes custom fallback UI components to handle potential issues with Chakra UI:
- Custom Toast implementation (logs to console if Chakra UI toasts are unavailable)
- Custom Modal components to avoid dependency issues

### TypeScript Integration

AWS Amplify client is typed using temporary interfaces to ensure proper type checking:
- `Schema` interface defines the expected API methods
- `ApiError` interface ensures proper error handling
- TypeScript ignore comments are used where necessary to work with the mock interface

### Future Improvements

1. Replace custom UI components with proper Chakra UI imports when package issues are resolved
2. Add unit and integration tests covering the onboarding flow
3. Implement a more robust state management solution for user preferences
4. Add form validation to the onboarding steps
