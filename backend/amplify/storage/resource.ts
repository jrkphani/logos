import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'LogosDocumentStorage', // This will be part of the S3 bucket name
  access: (allow) => ({
    'public/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
      allow.groups(['admin']).to(['read', 'write', 'delete'])
    ],
    'user-private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.groups(['admin']).to(['read', 'write', 'delete'])
    ],
    'admin-access/*': [
      allow.groups(['admin']).to(['read', 'write', 'delete'])
    ]
  })
}); 