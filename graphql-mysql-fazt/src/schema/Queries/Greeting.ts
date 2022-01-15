

import { GraphQLString } from "graphql"

/* una action siempre lleva el type y el resolve */
export const GREETING = {
  type: GraphQLString,
  resolve: () => "Hello World"
}