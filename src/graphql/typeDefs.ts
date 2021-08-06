import gql from "graphql-tag";

export const typeDefs = gql`
	# note  Types
	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
	}
	type LoginResponse {
		accessToken: String!
	}
	#user types
	type U_Account {
		username: String!
		tag: String!
		short: String!
		password: String!
		email: String!
		createdAt: String!
		lastOnline: String!
		private: Boolean!
		blockedIds: [String]!
		pro: Boolean!
	}
	type U_Profile {
		bannerUrl: String!
		pictureUrl: String!
		description: String!
		followingIds: [String]!
		followerIds: [String]!
		friendIds: [String]!
		friendRqIds: [String]!
		badges: [String]!
		linkedProfiles: [String]!
	}
	type U_Social {
		postIds: [String]!
		blogIds: [String]!
		groupIds: [String]!
		betaIds: U_BetaIds!
		chatIds: [String]!
	}
	type U_BetaIds {
		hostedIds: [String]!
		joinedIds: [String]!
	}

	#all types
	type User {
		id: ID!
		token: String!
		account: U_Account!
		profile: U_Profile!
		status: String!
		social: U_Social!
	}
	input RegisterInput {
		password: String!
		email: String!
	}

	# note  Queries (searches)
	type Query {
		getPosts: [Post],
		myAccount: {U_Account!, U_Profile!},
	}

	# note  Mutations (read/write/updates)
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(input: String!, password: String!): LoginResponse!
	}
`;
