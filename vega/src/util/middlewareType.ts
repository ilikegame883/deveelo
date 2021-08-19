import { GraphQLResolveInfo } from "graphql";
import { StitchingInfo } from "@graphql-tools/delegate";

import Context from "src/context";

//slightly different version of gql-middleware resolver type. This sets the ctx to our custom Context.ts
export declare type NewIMiddlewareResolver<TSource = any, TContext = Context, TArgs = any> = (
	resolve: (source?: TSource, args?: TArgs, context?: TContext, info?: GraphQLResolveInfo & { stitchingInfo?: StitchingInfo }) => any,
	parent: TSource,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<any>;
