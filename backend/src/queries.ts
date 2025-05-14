/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCollectionDefinition = /* GraphQL */ `query GetCollectionDefinition($id: ID!) {
  getCollectionDefinition(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCollectionDefinitionQueryVariables,
  APITypes.GetCollectionDefinitionQuery
>;
export const getCollectionEntry = /* GraphQL */ `query GetCollectionEntry($id: ID!) {
  getCollectionEntry(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCollectionEntryQueryVariables,
  APITypes.GetCollectionEntryQuery
>;
export const getDocument = /* GraphQL */ `query GetDocument($id: ID!) {
  getDocument(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetDocumentQueryVariables,
  APITypes.GetDocumentQuery
>;
export const getSharePermission = /* GraphQL */ `query GetSharePermission($documentId: ID!, $sharedWithUserId: String!) {
  getSharePermission(
    documentId: $documentId
    sharedWithUserId: $sharedWithUserId
  ) {
    createdAt
    documentId
    owner
    permissionLevel
    sharedWithUserId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSharePermissionQueryVariables,
  APITypes.GetSharePermissionQuery
>;
export const getUserProfile = /* GraphQL */ `query GetUserProfile($userId: String!) {
  getUserProfile(userId: $userId) {
    createdAt
    preferredDocumentTypes
    updatedAt
    userId
    userRole
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProfileQueryVariables,
  APITypes.GetUserProfileQuery
>;
export const listCollectionDefinitions = /* GraphQL */ `query ListCollectionDefinitions(
  $filter: ModelCollectionDefinitionFilterInput
  $limit: Int
  $nextToken: String
) {
  listCollectionDefinitions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      createdAt
      documentId
      fieldDefinitions
      id
      name
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCollectionDefinitionsQueryVariables,
  APITypes.ListCollectionDefinitionsQuery
>;
export const listCollectionEntries = /* GraphQL */ `query ListCollectionEntries(
  $filter: ModelCollectionEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCollectionEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      collectionDefinitionId
      createdAt
      id
      linkedSubpageDocumentId
      owner
      updatedAt
      values
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCollectionEntriesQueryVariables,
  APITypes.ListCollectionEntriesQuery
>;
export const listDocuments = /* GraphQL */ `query ListDocuments(
  $filter: ModelDocumentFilterInput
  $limit: Int
  $nextToken: String
) {
  listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDocumentsQueryVariables,
  APITypes.ListDocumentsQuery
>;
export const listSharePermissions = /* GraphQL */ `query ListSharePermissions(
  $documentId: ID
  $filter: ModelSharePermissionFilterInput
  $limit: Int
  $nextToken: String
  $sharedWithUserId: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
) {
  listSharePermissions(
    documentId: $documentId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sharedWithUserId: $sharedWithUserId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      documentId
      owner
      permissionLevel
      sharedWithUserId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSharePermissionsQueryVariables,
  APITypes.ListSharePermissionsQuery
>;
export const listUserProfiles = /* GraphQL */ `query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $userId: String
) {
  listUserProfiles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    userId: $userId
  ) {
    items {
      createdAt
      preferredDocumentTypes
      updatedAt
      userId
      userRole
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserProfilesQueryVariables,
  APITypes.ListUserProfilesQuery
>;
