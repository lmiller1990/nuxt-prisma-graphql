/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type SaveLinkInput = {
  readonly href: Scalars['String'];
  readonly id: Scalars['Int'];
  readonly text: Scalars['String'];
};

export type ThemeName =
  | 'forest';

export type CreateLinkMutationVariables = Exact<{
  text: Scalars['String'];
  href: Scalars['String'];
  order: Scalars['Int'];
}>;


export type CreateLinkMutation = { readonly __typename?: 'Mutation', readonly createLink: { readonly __typename?: 'User', readonly id: number, readonly links: ReadonlyArray<{ readonly __typename?: 'Link', readonly id: number, readonly order: number, readonly text: string }> } | null | undefined };

export type LinksFragment = { readonly __typename?: 'User', readonly links: ReadonlyArray<{ readonly __typename?: 'Link', readonly id: number, readonly text: string, readonly href: string, readonly order: number }> };

export type PreviewQueryVariables = Exact<{
  theme: ThemeName;
}>;


export type PreviewQuery = { readonly __typename?: 'Query', readonly preview: string | null | undefined };

export type SaveLinksMutationVariables = Exact<{
  links: ReadonlyArray<SaveLinkInput> | SaveLinkInput;
}>;


export type SaveLinksMutation = { readonly __typename?: 'Mutation', readonly saveLinks: { readonly __typename?: 'User', readonly id: number, readonly email: string, readonly links: ReadonlyArray<{ readonly __typename?: 'Link', readonly id: number, readonly text: string, readonly href: string, readonly order: number }> } | null | undefined };

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { readonly __typename?: 'Query', readonly viewer: { readonly __typename?: 'User', readonly id: number, readonly email: string, readonly links: ReadonlyArray<{ readonly __typename?: 'Link', readonly id: number, readonly text: string, readonly href: string, readonly order: number }> } | null | undefined };

export const LinksFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Links"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]} as unknown as DocumentNode<LinksFragment, unknown>;
export const CreateLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"href"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"href"},"value":{"kind":"Variable","name":{"kind":"Name","value":"href"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLinkMutation, CreateLinkMutationVariables>;
export const PreviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Preview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"theme"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ThemeName"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"theme"},"value":{"kind":"Variable","name":{"kind":"Name","value":"theme"}}}]}]}}]} as unknown as DocumentNode<PreviewQuery, PreviewQueryVariables>;
export const SaveLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveLinks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"links"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaveLinkInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveLinks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"links"},"value":{"kind":"Variable","name":{"kind":"Name","value":"links"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Links"}}]}}]}},...LinksFragmentDoc.definitions]} as unknown as DocumentNode<SaveLinksMutation, SaveLinksMutationVariables>;
export const AppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"App"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Links"}}]}}]}},...LinksFragmentDoc.definitions]} as unknown as DocumentNode<AppQuery, AppQueryVariables>;