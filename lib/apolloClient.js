import fetch from "isomorphic-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.WPGRAPHQL_URL || `http://ff2022.local/graphql`,
    fetch,
  }),
  cache: new InMemoryCache(),
});