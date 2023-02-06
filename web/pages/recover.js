import Head from 'next/head'
import { Loader } from '~/components/Loader'
import { RecoverPage } from '~/scenes/Recover'
import { gql, useQuery } from '@apollo/client'

const Recover = () => {
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
          <title>Recover page</title>
        </Head>
        <RecoverPage authImages={SiteConfig.authImages} />
      </>
    )
  )
}

export default Recover
