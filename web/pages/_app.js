import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import apolloClient from '~/utils/apollo-client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import 'swiper/swiper.scss'
import '../styles/index.scss'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp
