import Head from 'next/head'
import { SignUp } from '~/scenes/SignUp'
import { gql, useQuery } from '@apollo/client'
import { Loader } from '~/components/Loader'

const Signup = () => {
  const QUERY = gql`
    query Config {
      SiteConfig(id: "global-config") {
        authImages {
          asset {
            assetId
            url
          }
        }
      }
    }
  `
  const { data, loading, error } = useQuery(QUERY)
  if (loading) {
    return <Loader />
  }
  if (error) {
    console.error(error)
    return null
  }
  const { SiteConfig } = data

  return (
    SiteConfig && (
      <>
        <Head>
          <title>Sign Up page</title>
        </Head>
        <SignUp authImages={SiteConfig.authImages} />
      </>
    )
  )
}

export default Signup
