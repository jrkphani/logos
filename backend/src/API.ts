/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CollectionDefinition = {
  __typename: "CollectionDefinition",
  createdAt: string,
  documentId: string,
  fieldDefinitions: string,
  id: string,
  name: string,
  owner?: string | null,
  updatedAt: string,
};

export type CollectionEntry = {
  __typename: "CollectionEntry",
  collectionDefinitionId: string,
  createdAt: string,
  id: string,
  linkedSubpageDocumentId?: string | null,
  owner?: string | null,
  updatedAt: string,
  values: string,
};

export type Document = {
  __typename: "Document",
  createdAt: string,
  id: string,
  isPinned?: boolean | null,
  owner?: string | null,
  parentDocumentId?: string | null,
  s3ContentKey?: string | null,
  title: string,
  updatedAt: string,
};

export type SharePermission = {
  __typename: "SharePermission",
  createdAt: string,
  documentId: string,
  owner?: string | null,
  permissionLevel?: SharePermissionPermissionLevel | null,
  sharedWithUserId: string,
  updatedAt: string,
};

export enum SharePermissionPermissionLevel {
  EDIT = "EDIT",
  VIEW = "VIEW",
}


export type UserProfile = {
  __typename: "UserProfile",
  createdAt: string,
  preferredDocumentTypes?: Array< string | null > | null,
  updatedAt: string,
  userId: string,
  userRole?: string | null,
};

export type ModelCollectionDefinitionFilterInput = {
  and?: Array< ModelCollectionDefinitionFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  fieldDefinitions?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelCollectionDefinitionFilterInput | null,
  or?: Array< ModelCollectionDefinitionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelCollectionDefinitionConnection = {
  __typename: "ModelCollectionDefinitionConnection",
  items:  Array<CollectionDefinition | null >,
  nextToken?: string | null,
};

export type ModelCollectionEntryFilterInput = {
  and?: Array< ModelCollectionEntryFilterInput | null > | null,
  collectionDefinitionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  linkedSubpageDocumentId?: ModelIDInput | null,
  not?: ModelCollectionEntryFilterInput | null,
  or?: Array< ModelCollectionEntryFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  values?: ModelStringInput | null,
};

export type ModelCollectionEntryConnection = {
  __typename: "ModelCollectionEntryConnection",
  items:  Array<CollectionEntry | null >,
  nextToken?: string | null,
};

export type ModelDocumentFilterInput = {
  and?: Array< ModelDocumentFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isPinned?: ModelBooleanInput | null,
  not?: ModelDocumentFilterInput | null,
  or?: Array< ModelDocumentFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parentDocumentId?: ModelIDInput | null,
  s3ContentKey?: ModelStringInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelDocumentConnection = {
  __typename: "ModelDocumentConnection",
  items:  Array<Document | null >,
  nextToken?: string | null,
};

export type ModelSharePermissionFilterInput = {
  and?: Array< ModelSharePermissionFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelSharePermissionFilterInput | null,
  or?: Array< ModelSharePermissionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  permissionLevel?: ModelSharePermissionPermissionLevelInput | null,
  sharedWithUserId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSharePermissionPermissionLevelInput = {
  eq?: SharePermissionPermissionLevel | null,
  ne?: SharePermissionPermissionLevel | null,
};

export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSharePermissionConnection = {
  __typename: "ModelSharePermissionConnection",
  items:  Array<SharePermission | null >,
  nextToken?: string | null,
};

export type ModelUserProfileFilterInput = {
  and?: Array< ModelUserProfileFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserProfileFilterInput | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  preferredDocumentTypes?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  userRole?: ModelStringInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items:  Array<UserProfile | null >,
  nextToken?: string | null,
};

export type ModelCollectionDefinitionConditionInput = {
  and?: Array< ModelCollectionDefinitionConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  documentId?: ModelIDInput | null,
  fieldDefinitions?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelCollectionDefinitionConditionInput | null,
  or?: Array< ModelCollectionDefinitionConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCollectionDefinitionInput = {
  documentId: string,
  fieldDefinitions: string,
  id?: string | null,
  name: string,
};

export type ModelCollectionEntryConditionInput = {
  and?: Array< ModelCollectionEntryConditionInput | null > | null,
  collectionDefinitionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  linkedSubpageDocumentId?: ModelIDInput | null,
  not?: ModelCollectionEntryConditionInput | null,
  or?: Array< ModelCollectionEntryConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  values?: ModelStringInput | null,
};

export type CreateCollectionEntryInput = {
  collectionDefinitionId: string,
  id?: string | null,
  linkedSubpageDocumentId?: string | null,
  values: string,
};

export type ModelDocumentConditionInput = {
  and?: Array< ModelDocumentConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  isPinned?: ModelBooleanInput | null,
  not?: ModelDocumentConditionInput | null,
  or?: Array< ModelDocumentConditionInput | null > | null,
  owner?: ModelStringInput | null,
  parentDocumentId?: ModelIDInput | null,
  s3ContentKey?: ModelStringInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDocumentInput = {
  id?: string | null,
  isPinned?: boolean | null,
  parentDocumentId?: string | null,
  s3ContentKey?: string | null,
  title: string,
};

export type ModelSharePermissionConditionInput = {
  and?: Array< ModelSharePermissionConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelSharePermissionConditionInput | null,
  or?: Array< ModelSharePermissionConditionInput | null > | null,
  owner?: ModelStringInput | null,
  permissionLevel?: ModelSharePermissionPermissionLevelInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSharePermissionInput = {
  documentId: string,
  permissionLevel?: SharePermissionPermissionLevel | null,
  sharedWithUserId: string,
};

export type ModelUserProfileConditionInput = {
  and?: Array< ModelUserProfileConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelUserProfileConditionInput | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  preferredDocumentTypes?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  userRole?: ModelStringInput | null,
};

export type CreateUserProfileInput = {
  preferredDocumentTypes?: Array< string | null > | null,
  userId: string,
  userRole?: string | null,
};

export type DeleteCollectionDefinitionInput = {
  id: string,
};

export type DeleteCollectionEntryInput = {
  id: string,
};

export type DeleteDocumentInput = {
  id: string,
};

export type DeleteSharePermissionInput = {
  documentId: string,
  sharedWithUserId: string,
};

export type DeleteUserProfileInput = {
  userId: string,
};

export type UpdateCollectionDefinitionInput = {
  documentId?: string | null,
  fieldDefinitions?: string | null,
  id: string,
  name?: string | null,
};

export type UpdateCollectionEntryInput = {
  collectionDefinitionId?: string | null,
  id: string,
  linkedSubpageDocumentId?: string | null,
  values?: string | null,
};

export type UpdateDocumentInput = {
  id: string,
  isPinned?: boolean | null,
  parentDocumentId?: string | null,
  s3ContentKey?: string | null,
  title?: string | null,
};

export type UpdateSharePermissionInput = {
  documentId: string,
  permissionLevel?: SharePermissionPermissionLevel | null,
  sharedWithUserId: string,
};

export type UpdateUserProfileInput = {
  preferredDocumentTypes?: Array< string | null > | null,
  userId: string,
  userRole?: string | null,
};

export type ModelSubscriptionCollectionDefinitionFilterInput = {
  and?: Array< ModelSubscriptionCollectionDefinitionFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  documentId?: ModelSubscriptionIDInput | null,
  fieldDefinitions?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCollectionDefinitionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCollectionEntryFilterInput = {
  and?: Array< ModelSubscriptionCollectionEntryFilterInput | null > | null,
  collectionDefinitionId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  linkedSubpageDocumentId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionCollectionEntryFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  values?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionDocumentFilterInput = {
  and?: Array< ModelSubscriptionDocumentFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isPinned?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionDocumentFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parentDocumentId?: ModelSubscriptionIDInput | null,
  s3ContentKey?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionSharePermissionFilterInput = {
  and?: Array< ModelSubscriptionSharePermissionFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  documentId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionSharePermissionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  permissionLevel?: ModelSubscriptionStringInput | null,
  sharedWithUserId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserProfileFilterInput = {
  and?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  preferredDocumentTypes?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelStringInput | null,
  userRole?: ModelSubscriptionStringInput | null,
};

export type GetCollectionDefinitionQueryVariables = {
  id: string,
};

export type GetCollectionDefinitionQuery = {
  getCollectionDefinition?:  {
    __typename: "CollectionDefinition",
    createdAt: string,
    documentId: string,
    fieldDefinitions: string,
    id: string,
    name: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type GetCollectionEntryQueryVariables = {
  id: string,
};

export type GetCollectionEntryQuery = {
  getCollectionEntry?:  {
    __typename: "CollectionEntry",
    collectionDefinitionId: string,
    createdAt: string,
    id: string,
    linkedSubpageDocumentId?: string | null,
    owner?: string | null,
    updatedAt: string,
    values: string,
  } | null,
};

export type GetDocumentQueryVariables = {
  id: string,
};

export type GetDocumentQuery = {
  getDocument?:  {
    __typename: "Document",
    createdAt: string,
    id: string,
    isPinned?: boolean | null,
    owner?: string | null,
    parentDocumentId?: string | null,
    s3ContentKey?: string | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type GetSharePermissionQueryVariables = {
  documentId: string,
  sharedWithUserId: string,
};

export type GetSharePermissionQuery = {
  getSharePermission?:  {
    __typename: "SharePermission",
    createdAt: string,
    documentId: string,
    owner?: string | null,
    permissionLevel?: SharePermissionPermissionLevel | null,
    sharedWithUserId: string,
    updatedAt: string,
  } | null,
};

export type GetUserProfileQueryVariables = {
  userId: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    preferredDocumentTypes?: Array< string | null > | null,
    updatedAt: string,
    userId: string,
    userRole?: string | null,
  } | null,
};

export type ListCollectionDefinitionsQueryVariables = {
  filter?: ModelCollectionDefinitionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCollectionDefinitionsQuery = {
  listCollectionDefinitions?:  {
    __typename: "ModelCollectionDefinitionConnection",
    items:  Array< {
      __typename: "CollectionDefinition",
      createdAt: string,
      documentId: string,
      fieldDefinitions: string,
      id: string,
      name: string,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCollectionEntriesQueryVariables = {
  filter?: ModelCollectionEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCollectionEntriesQuery = {
  listCollectionEntries?:  {
    __typename: "ModelCollectionEntryConnection",
    items:  Array< {
      __typename: "CollectionEntry",
      collectionDefinitionId: string,
      createdAt: string,
      id: string,
      linkedSubpageDocumentId?: string | null,
      owner?: string | null,
      updatedAt: string,
      values: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDocumentsQueryVariables = {
  filter?: ModelDocumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDocumentsQuery = {
  listDocuments?:  {
    __typename: "ModelDocumentConnection",
    items:  Array< {
      __typename: "Document",
      createdAt: string,
      id: string,
      isPinned?: boolean | null,
      owner?: string | null,
      parentDocumentId?: string | null,
      s3ContentKey?: string | null,
      title: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSharePermissionsQueryVariables = {
  documentId?: string | null,
  filter?: ModelSharePermissionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sharedWithUserId?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListSharePermissionsQuery = {
  listSharePermissions?:  {
    __typename: "ModelSharePermissionConnection",
    items:  Array< {
      __typename: "SharePermission",
      createdAt: string,
      documentId: string,
      owner?: string | null,
      permissionLevel?: SharePermissionPermissionLevel | null,
      sharedWithUserId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  userId?: string | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items:  Array< {
      __typename: "UserProfile",
      createdAt: string,
      preferredDocumentTypes?: Array< string | null > | null,
      updatedAt: string,
      userId: string,
      userRole?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateCollectionDefinitionMutationVariables = {
  condition?: ModelCollectionDefinitionConditionInput | null,
  input: CreateCollectionDefinitionInput,
};

export type CreateCollectionDefinitionMutation = {
  createCollectionDefinition?:  {
    __typename: "CollectionDefinition",
    createdAt: string,
    documentId: string,
    fieldDefinitions: string,
    id: string,
    name: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateCollectionEntryMutationVariables = {
  condition?: ModelCollectionEntryConditionInput | null,
  input: CreateCollectionEntryInput,
};

export type CreateCollectionEntryMutation = {
  createCollectionEntry?:  {
    __typename: "CollectionEntry",
    collectionDefinitionId: string,
    createdAt: string,
    id: string,
    linkedSubpageDocumentId?: string | null,
    owner?: string | null,
    updatedAt: string,
    values: string,
  } | null,
};

export type CreateDocumentMutationVariables = {
  condition?: ModelDocumentConditionInput | null,
  input: CreateDocumentInput,
};

export type CreateDocumentMutation = {
  createDocument?:  {
    __typename: "Document",
    createdAt: string,
    id: string,
    isPinned?: boolean | null,
    owner?: string | null,
    parentDocumentId?: string | null,
    s3ContentKey?: string | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type CreateSharePermissionMutationVariables = {
  condition?: ModelSharePermissionConditionInput | null,
  input: CreateSharePermissionInput,
};

export type CreateSharePermissionMutation = {
  createSharePermission?:  {
    __typename: "SharePermission",
    createdAt: string,
    documentId: string,
    owner?: string | null,
    permissionLevel?: SharePermissionPermissionLevel | null,
    sharedWithUserId: string,
    updatedAt: string,
  } | null,
};

export type CreateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: CreateUserProfileInput,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    preferredDocumentTypes?: Array< string | null > | null,
    updatedAt: string,
    userId: string,
    userRole?: string | null,
  } | null,
};

export type DeleteCollectionDefinitionMutationVariables = {
  condition?: ModelCollectionDefinitionConditionInput | null,
  input: DeleteCollectionDefinitionInput,
};

export type DeleteCollectionDefinitionMutation = {
  deleteCollectionDefinition?:  {
    __typename: "CollectionDefinition",
    createdAt: string,
    documentId: string,
    fieldDefinitions: string,
    id: string,
    name: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteCollectionEntryMutationVariables = {
  condition?: ModelCollectionEntryConditionInput | null,
  input: DeleteCollectionEntryInput,
};

export type DeleteCollectionEntryMutation = {
  deleteCollectionEntry?:  {
    __typename: "CollectionEntry",
    collectionDefinitionId: string,
    createdAt: string,
    id: string,
    linkedSubpageDocumentId?: string | null,
    owner?: string | null,
    updatedAt: string,
    values: string,
  } | null,
};

export type DeleteDocumentMutationVariables = {
  condition?: ModelDocumentConditionInput | null,
  input: DeleteDocumentInput,
};

export type DeleteDocumentMutation = {
  deleteDocument?:  {
    __typename: "Document",
    createdAt: string,
    id: string,
    isPinned?: boolean | null,
    owner?: string | null,
    parentDocumentId?: string | null,
    s3ContentKey?: string | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type DeleteSharePermissionMutationVariables = {
  condition?: ModelSharePermissionConditionInput | null,
  input: DeleteSharePermissionInput,
};

export type DeleteSharePermissionMutation = {
  deleteSharePermission?:  {
    __typename: "SharePermission",
    createdAt: string,
    documentId: string,
    owner?: string | null,
    permissionLevel?: SharePermissionPermissionLevel | null,
    sharedWithUserId: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: DeleteUserProfileInput,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    preferredDocumentTypes?: Array< string | null > | null,
    updatedAt: string,
    userId: string,
    userRole?: string | null,
  } | null,
};

export type UpdateCollectionDefinitionMutationVariables = {
  condition?: ModelCollectionDefinitionConditionInput | null,
  input: UpdateCollectionDefinitionInput,
};

export type UpdateCollectionDefinitionMutation = {
  updateCollectionDefinition?:  {
    __typename: "CollectionDefinition",
    createdAt: string,
    documentId: string,
    fieldDefinitions: string,
    id: string,
    name: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateCollectionEntryMutationVariables = {
  condition?: ModelCollectionEntryConditionInput | null,
  input: UpdateCollectionEntryInput,
};

export type UpdateCollectionEntryMutation = {
  updateCollectionEntry?:  {
    __typename: "CollectionEntry",
    collectionDefinitionId: string,
    createdAt: string,
    id: string,
    linkedSubpageDocumentId?: string | null,
    owner?: string | null,
    updatedAt: string,
    values: string,
  } | null,
};

export type UpdateDocumentMutationVariables = {
  condition?: ModelDocumentConditionInput | null,
  input: UpdateDocumentInput,
};

export type UpdateDocumentMutation = {
  updateDocument?:  {
    __typename: "Document",
    createdAt: string,
    id: string,
    isPinned?: boolean | null,
    owner?: string | null,
    parentDocumentId?: string | null,
    s3ContentKey?: string | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type UpdateSharePermissionMutationVariables = {
  condition?: ModelSharePermissionConditionInput | null,
  input: UpdateSharePermissionInput,
};

export type UpdateSharePermissionMutation = {
  updateSharePermission?:  {
    __typename: "SharePermission",
    createdAt: string,
    documentId: string,
    owner?: string | null,
    permissionLevel?: SharePermissionPermissionLevel | null,
    sharedWithUserId: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: UpdateUserProfileInput,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    preferredDocumentTypes?: Array< string | null > | null,
    updatedAt: string,
    userId: string,
    userRole?: string | null,
  } | null,
};

export type OnCreateCollectionDefinitionSubscriptionVariables = {
  filter?: ModelSubscriptionCollectionDefinitionFilterInput | null,
  owner?: string | null,
};

export type OnCreateCollectionDefinitionSubscription = {
  onCreateCollectionDefinition?:  {
    __typename: "CollectionDefinition",
    createdAt: string,
    documentId: string,
    fieldDefinitions: string,
    id: string,
    name: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateCollectionEntrySubscriptionVariables = {
  filter?: ModelSubscriptionCollectionEntryFilterInput | null,
  owner?: string | null,
};

export type OnCreateCollectionEntrySubscription = {
  onCreateCollectionEntry?:  {
    __typename: "CollectionEntry",
    collectionDefinitionId: string,
    createdAt: string,
    id: string,
    linkedSubpageDocumentId?: string | null,
    owner?: string | null,
    updatedAt: string,
    values: string,
  } | null,
};

export type OnCreateDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
  owner?: string | null,
};

export type OnCreateDocumentSubscription = {
  onCreateDocument?:  {
    __typename: "Document",
    createdAt: string,
    id: string,
    isPinned?: boolean | null,
    owner?: string | null,
    parentDocumentId?: string | null,
    s3ContentKey?: string | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSharePermissionSubscriptionVariables = {
  filter?: ModelSubscriptionSharePermissionFilterInput | null,
  owner?: string | null,
};

export type OnCreateSharePermissionSubscription = {
  onCreateSharePermission?:  {
    __typename: "SharePermission",
    createdAt: string,
    documentId: string,
    owner?: string | null,
    permissionLevel?: SharePermissionPermissionLevel | null,
    sharedWithUserId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  userId?: string | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    preferredDocumentTypes?: Array< string | null > | null,
    updatedAt: string,
    userId: string,
    userRole?: string | null,
  } | null,
};

export type OnDeleteCollectionDefinitionSubscriptionVariables = {
  filter?: ModelSubscriptionCollectionDefinitionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCollectionDefinitionSubscription = {
  onDeleteCollectionDefinition?:  {
    __typename: "CollectionDefinition",
    createdAt: string,
    documentId: string,
    fieldDefinitions: string,
    id: string,
    name: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCollectionEntrySubscriptionVariables = {
  filter?: ModelSubscriptionCollectionEntryFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCollectionEntrySubscription = {
  onDeleteCollectionEntry?:  {
    __typename: "CollectionEntry",
    collectionDefinitionId: string,
    createdAt: string,
    id: string,
    linkedSubpageDocumentId?: string | null,
    owner?: string | null,
    updatedAt: string,
    values: string,
  } | null,
};

export type OnDeleteDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
  owner?: string | null,
};

export type OnDeleteDocumentSubscription = {
  onDeleteDocument?:  {
    __typename: "Document",
    createdAt: string,
    id: string,
    isPinned?: boolean | null,
    owner?: string | null,
    parentDocumentId?: string | null,
    s3ContentKey?: string | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSharePermissionSubscriptionVariables = {
  filter?: ModelSubscriptionSharePermissionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteSharePermissionSubscription = {
  onDeleteSharePermission?:  {
    __typename: "SharePermission",
    createdAt: string,
    documentId: string,
    owner?: string | null,
    permissionLevel?: SharePermissionPermissionLevel | null,
    sharedWithUserId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  userId?: string | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    preferredDocumentTypes?: Array< string | null > | null,
    updatedAt: string,
    userId: string,
    userRole?: string | null,
  } | null,
};

export type OnUpdateCollectionDefinitionSubscriptionVariables = {
  filter?: ModelSubscriptionCollectionDefinitionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCollectionDefinitionSubscription = {
  onUpdateCollectionDefinition?:  {
    __typename: "CollectionDefinition",
    createdAt: string,
    documentId: string,
    fieldDefinitions: string,
    id: string,
    name: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCollectionEntrySubscriptionVariables = {
  filter?: ModelSubscriptionCollectionEntryFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCollectionEntrySubscription = {
  onUpdateCollectionEntry?:  {
    __typename: "CollectionEntry",
    collectionDefinitionId: string,
    createdAt: string,
    id: string,
    linkedSubpageDocumentId?: string | null,
    owner?: string | null,
    updatedAt: string,
    values: string,
  } | null,
};

export type OnUpdateDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
  owner?: string | null,
};

export type OnUpdateDocumentSubscription = {
  onUpdateDocument?:  {
    __typename: "Document",
    createdAt: string,
    id: string,
    isPinned?: boolean | null,
    owner?: string | null,
    parentDocumentId?: string | null,
    s3ContentKey?: string | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSharePermissionSubscriptionVariables = {
  filter?: ModelSubscriptionSharePermissionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateSharePermissionSubscription = {
  onUpdateSharePermission?:  {
    __typename: "SharePermission",
    createdAt: string,
    documentId: string,
    owner?: string | null,
    permissionLevel?: SharePermissionPermissionLevel | null,
    sharedWithUserId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  userId?: string | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    createdAt: string,
    preferredDocumentTypes?: Array< string | null > | null,
    updatedAt: string,
    userId: string,
    userRole?: string | null,
  } | null,
};
