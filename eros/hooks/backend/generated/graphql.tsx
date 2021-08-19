import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BoolRes = {
  __typename?: 'BoolRes';
  success: Scalars['Boolean'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: LoginResponse;
  login: LoginResponse;
};


export type MutationRegisterArgs = {
  registerInput?: Maybe<RegisterInput>;
};


export type MutationLoginArgs = {
  input: Scalars['String'];
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPosts: Array<Maybe<Post>>;
  myAccount: User;
};

export type RegisterInput = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type U_Account = {
  __typename?: 'U_Account';
  username: Scalars['String'];
  tag: Scalars['String'];
  short: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  lastOnline: Scalars['String'];
  private: Scalars['Boolean'];
  blockedIds: Array<Maybe<Scalars['String']>>;
  tokenVersion: Scalars['Int'];
  pro: Scalars['Boolean'];
};

export type U_BetaIds = {
  __typename?: 'U_BetaIds';
  hostedIds: Array<Maybe<Scalars['String']>>;
  joinedIds: Array<Maybe<Scalars['String']>>;
};

export type U_Profile = {
  __typename?: 'U_Profile';
  bannerUrl: Scalars['String'];
  pictureUrl: Scalars['String'];
  description: Scalars['String'];
  followingIds: Array<Maybe<Scalars['String']>>;
  followerIds: Array<Maybe<Scalars['String']>>;
  friendIds: Array<Maybe<Scalars['String']>>;
  friendRqIds: Array<Maybe<Scalars['String']>>;
  badges: Array<Maybe<Scalars['String']>>;
  linkedProfiles: Array<Maybe<Scalars['String']>>;
};

export type U_Social = {
  __typename?: 'U_Social';
  postIds: Array<Maybe<Scalars['String']>>;
  blogIds: Array<Maybe<Scalars['String']>>;
  groupIds: Array<Maybe<Scalars['String']>>;
  betaIds: U_BetaIds;
  chatIds: Array<Maybe<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  account: U_Account;
  profile: U_Profile;
  status: Scalars['String'];
  social: U_Social;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<Maybe<{ __typename?: 'Post', _id: string, body: string, createdAt: string, username: string }>> };


export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    _id
    body
    createdAt
    username
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;