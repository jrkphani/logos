import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
// Import any function resources here later, e.g. for AI Copilot
// import { myCopilotFunction } from './functions/copilot-handler/resource';

/**
 * @see https://docs.amplify.aws/gen2/build-a-backend/
 */
const backend = defineBackend({
  auth,
  data,
  storage,
  // myCopilotFunction, // Add function resources here
});

// If you need to add custom outputs to amplify_outputs.json (e.g., from custom CDK resources)
// backend.addOutput({
//   custom: {
//     myCustomOutput: "someValue"
//   }
// });

export default backend; // Ensure there's a default export
