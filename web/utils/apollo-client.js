import { ApolloClient, InMemoryCache } from '@apollo/client'

const SANITY_API_URI = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${process.env.NEXT_PUBLIC_SANITY_SCHEME_NAME}`

const client = new ApolloClient({
  uri: SANITY_API_URI,
  cache: new InMemoryCache(),
})

export default client
