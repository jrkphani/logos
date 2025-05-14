/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCollectionDefinition = /* GraphQL */ `subscription OnCreateCollectionDefinition(
  $filter: ModelSubscriptionCollectionDefinitionFilterInput
  $owner: String
) {
  onCreateCollectionDefinition(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCollectionDefinitionSubscriptionVariables,
  APITypes.OnCreateCollectionDefinitionSubscription
>;
export const onCreateCollectionEntry = /* GraphQL */ `subscription OnCreateCollectionEntry(
  $filter: ModelSubscriptionCollectionEntryFilterInput
  $owner: String
) {
  onCreateCollectionEntry(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCollectionEntrySubscriptionVariables,
  APITypes.OnCreateCollectionEntrySubscription
>;
export const onCreateDocument = /* GraphQL */ `subscription OnCreateDocument(
  $filter: ModelSubscriptionDocumentFilterInput
  $owner: String
) {
  onCreateDocument(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateDocumentSubscriptionVariables,
  APITypes.OnCreateDocumentSubscription
>;
export const onCreateSharePermission = /* GraphQL */ `subscription OnCreateSharePermission(
  $filter: ModelSubscriptionSharePermissionFilterInput
  $owner: String
) {
  onCreateSharePermission(filter: $filter, owner: $owner) {
    createdAt
    documentId
    owner
    permissionLevel
    sharedWithUserId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSharePermissionSubscriptionVariables,
  APITypes.OnCreateSharePermissionSubscription
>;
export const onCreateUserProfile = /* GraphQL */ `subscription OnCreateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $userId: String
) {
  onCreateUserProfile(filter: $filter, userId: $userId) {
    createdAt
    preferredDocumentTypes
    updatedAt
    userId
    userRole
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserProfileSubscriptionVariables,
  APITypes.OnCreateUserProfileSubscription
>;
export const onDeleteCollectionDefinition = /* GraphQL */ `subscription OnDeleteCollectionDefinition(
  $filter: ModelSubscriptionCollectionDefinitionFilterInput
  $owner: String
) {
  onDeleteCollectionDefinition(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCollectionDefinitionSubscriptionVariables,
  APITypes.OnDeleteCollectionDefinitionSubscription
>;
export const onDeleteCollectionEntry = /* GraphQL */ `subscription OnDeleteCollectionEntry(
  $filter: ModelSubscriptionCollectionEntryFilterInput
  $owner: String
) {
  onDeleteCollectionEntry(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCollectionEntrySubscriptionVariables,
  APITypes.OnDeleteCollectionEntrySubscription
>;
export const onDeleteDocument = /* GraphQL */ `subscription OnDeleteDocument(
  $filter: ModelSubscriptionDocumentFilterInput
  $owner: String
) {
  onDeleteDocument(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteDocumentSubscriptionVariables,
  APITypes.OnDeleteDocumentSubscription
>;
export const onDeleteSharePermission = /* GraphQL */ `subscription OnDeleteSharePermission(
  $filter: ModelSubscriptionSharePermissionFilterInput
  $owner: String
) {
  onDeleteSharePermission(filter: $filter, owner: $owner) {
    createdAt
    documentId
    owner
    permissionLevel
    sharedWithUserId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSharePermissionSubscriptionVariables,
  APITypes.OnDeleteSharePermissionSubscription
>;
export const onDeleteUserProfile = /* GraphQL */ `subscription OnDeleteUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $userId: String
) {
  onDeleteUserProfile(filter: $filter, userId: $userId) {
    createdAt
    preferredDocumentTypes
    updatedAt
    userId
    userRole
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserProfileSubscriptionVariables,
  APITypes.OnDeleteUserProfileSubscription
>;
export const onUpdateCollectionDefinition = /* GraphQL */ `subscription OnUpdateCollectionDefinition(
  $filter: ModelSubscriptionCollectionDefinitionFilterInput
  $owner: String
) {
  onUpdateCollectionDefinition(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCollectionDefinitionSubscriptionVariables,
  APITypes.OnUpdateCollectionDefinitionSubscription
>;
export const onUpdateCollectionEntry = /* GraphQL */ `subscription OnUpdateCollectionEntry(
  $filter: ModelSubscriptionCollectionEntryFilterInput
  $owner: String
) {
  onUpdateCollectionEntry(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCollectionEntrySubscriptionVariables,
  APITypes.OnUpdateCollectionEntrySubscription
>;
export const onUpdateDocument = /* GraphQL */ `subscription OnUpdateDocument(
  $filter: ModelSubscriptionDocumentFilterInput
  $owner: String
) {
  onUpdateDocument(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateDocumentSubscriptionVariables,
  APITypes.OnUpdateDocumentSubscription
>;
export const onUpdateSharePermission = /* GraphQL */ `subscription OnUpdateSharePermission(
  $filter: ModelSubscriptionSharePermissionFilterInput
  $owner: String
) {
  onUpdateSharePermission(filter: $filter, owner: $owner) {
    createdAt
    documentId
    owner
    permissionLevel
    sharedWithUserId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSharePermissionSubscriptionVariables,
  APITypes.OnUpdateSharePermissionSubscription
>;
export const onUpdateUserProfile = /* GraphQL */ `subscription OnUpdateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $userId: String
) {
  onUpdateUserProfile(filter: $filter, userId: $userId) {
    createdAt
    preferredDocumentTypes
    updatedAt
    userId
    userRole
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserProfileSubscriptionVariables,
  APITypes.OnUpdateUserProfileSubscription
>;
