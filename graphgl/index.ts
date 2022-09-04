import { ApolloClient, InMemoryCache } from '@apollo/client'
const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache: cache,
  uri: `${process.env.API_URL}/graphql`,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})
