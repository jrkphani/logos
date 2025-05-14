/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCollectionDefinition = /* GraphQL */ `mutation CreateCollectionDefinition(
  $condition: ModelCollectionDefinitionConditionInput
  $input: CreateCollectionDefinitionInput!
) {
  createCollectionDefinition(condition: $condition, input: $input) {
    createdAt
    documentId
    fieldDefinitions
    id
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCollectionDefinitionMutationVariables,
  APITypes.CreateCollectionDefinitionMutation
>;
export const createCollectionEntry = /* GraphQL */ `mutation CreateCollectionEntry(
  $condition: ModelCollectionEntryConditionInput
  $input: CreateCollectionEntryInput!
) {
  createCollectionEntry(condition: $condition, input: $input) {
    collectionDefinitionId
    createdAt
    id
    linkedSubpageDocumentId
    owner
    updatedAt
    values
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCollectionEntryMutationVariables,
  APITypes.CreateCollectionEntryMutation
>;
export const createDocument = /* GraphQL */ `mutation CreateDocument(
  $condition: ModelDocumentConditionInput
  $input: CreateDocumentInput!
) {
  createDocument(condition: $condition, input: $input) {
    createdAt
    id
    isPinned
    owner
    parentDocumentId
    s3ContentKey
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDocumentMutationVariables,
  APITypes.CreateDocumentMutation
>;
export const createSharePermission = /* GraphQL */ `mutation CreateSharePermission(
  $condition: ModelSharePermissionConditionInput
  $input: CreateSharePermissionInput!
) {
  createSharePermission(condition: $condition, input: $input) {
    createdAt
    documentId
    owner
    permissionLevel
    sharedWithUserId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSharePermissionMutationVariables,
  APITypes.CreateSharePermissionMutation
>;
export const createUserProfile = /* GraphQL */ `mutation CreateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: CreateUserProfileInput!
) {
  createUserProfile(condition: $condition, input: $input) {
    createdAt
    preferredDocumentTypes
    updatedAt
    userId
    userRole
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserProfileMutationVariables,
  APITypes.CreateUserProfileMutation
>;
export const deleteCollectionDefinition = /* GraphQL */ `mutation DeleteCollectionDefinition(
  $condition: ModelCollectionDefinitionConditionInput
  $input: DeleteCollectionDefinitionInput!
) {
  deleteCollectionDefinition(condition: $condition, input: $input) {
    createdAt
    documentId
    fieldDefinitions
    id
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCollectionDefinitionMutationVariables,
  APITypes.DeleteCollectionDefinitionMutation
>;
export const deleteCollectionEntry = /* GraphQL */ `mutation DeleteCollectionEntry(
  $condition: ModelCollectionEntryConditionInput
  $input: DeleteCollectionEntryInput!
) {
  deleteCollectionEntry(condition: $condition, input: $input) {
    collectionDefinitionId
    createdAt
    id
    linkedSubpageDocumentId
    owner
    updatedAt
    values
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCollectionEntryMutationVariables,
  APITypes.DeleteCollectionEntryMutation
>;
export const deleteDocument = /* GraphQL */ `mutation DeleteDocument(
  $condition: ModelDocumentConditionInput
  $input: DeleteDocumentInput!
) {
  deleteDocument(condition: $condition, input: $input) {
    createdAt
    id
    isPinned
    owner
    parentDocumentId
    s3ContentKey
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDocumentMutationVariables,
  APITypes.DeleteDocumentMutation
>;
export const deleteSharePermission = /* GraphQL */ `mutation DeleteSharePermission(
  $condition: ModelSharePermissionConditionInput
  $input: DeleteSharePermissionInput!
) {
  deleteSharePermission(condition: $condition, input: $input) {
    createdAt
    documentId
    owner
    permissionLevel
    sharedWithUserId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSharePermissionMutationVariables,
  APITypes.DeleteSharePermissionMutation
>;
export const deleteUserProfile = /* GraphQL */ `mutation DeleteUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: DeleteUserProfileInput!
) {
  deleteUserProfile(condition: $condition, input: $input) {
    createdAt
    preferredDocumentTypes
    updatedAt
    userId
    userRole
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserProfileMutationVariables,
  APITypes.DeleteUserProfileMutation
>;
export const updateCollectionDefinition = /* GraphQL */ `mutation UpdateCollectionDefinition(
  $condition: ModelCollectionDefinitionConditionInput
  $input: UpdateCollectionDefinitionInput!
) {
  updateCollectionDefinition(condition: $condition, input: $input) {
    createdAt
    documentId
    fieldDefinitions
    id
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCollectionDefinitionMutationVariables,
  APITypes.UpdateCollectionDefinitionMutation
>;
export const updateCollectionEntry = /* GraphQL */ `mutation UpdateCollectionEntry(
  $condition: ModelCollectionEntryConditionInput
  $input: UpdateCollectionEntryInput!
) {
  updateCollectionEntry(condition: $condition, input: $input) {
    collectionDefinitionId
    createdAt
    id
    linkedSubpageDocumentId
    owner
    updatedAt
    values
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCollectionEntryMutationVariables,
  APITypes.UpdateCollectionEntryMutation
>;
export const updateDocument = /* GraphQL */ `mutation UpdateDocument(
  $condition: ModelDocumentConditionInput
  $input: UpdateDocumentInput!
) {
  updateDocument(condition: $condition, input: $input) {
    createdAt
    id
    isPinned
    owner
    parentDocumentId
    s3ContentKey
    title
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDocumentMutationVariables,
  APITypes.UpdateDocumentMutation
>;
export const updateSharePermission = /* GraphQL */ `mutation UpdateSharePermission(
  $condition: ModelSharePermissionConditionInput
  $input: UpdateSharePermissionInput!
) {
  updateSharePermission(condition: $condition, input: $input) {
    createdAt
    documentId
    owner
    permissionLevel
    sharedWithUserId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSharePermissionMutationVariables,
  APITypes.UpdateSharePermissionMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: UpdateUserProfileInput!
) {
  updateUserProfile(condition: $condition, input: $input) {
    createdAt
    preferredDocumentTypes
    updatedAt
    userId
    userRole
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
