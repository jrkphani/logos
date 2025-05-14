import { Amplify } from 'aws-amplify';
import amplifyOutputs from '../amplify_outputs.json';

// Configure Amplify with the configuration from amplify_outputs.json
export const configureAmplify = () => {
  // Pass the amplify outputs directly
  Amplify.configure(amplifyOutputs);
}; 