import Head from 'next/head'
import Layout from '~/components/Layout'
import { gql, useQuery } from '@apollo/client'
import { Loader } from '~/components/Loader'
import BlockContent from '@sanity/block-content-to-react'

const PrivacyPolicy = () => {
  const QUERY = gql`
    query Config {
      SiteConfig(id: "global-config") {
        privacyPolicyRaw
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
  return (
    data && (
      <Layout>
        <Head>
          <title>Privacy Policy</title>
        </Head>
        <div className="container section-indent">
          <h1 className="h1 weight-800 color-darkgray text-center pt-5x mb-5x">Privacy Policy</h1>
          <div className="article-content">
            <BlockContent blocks={data.SiteConfig.privacyPolicyRaw} />
          </div>
        </div>
      </Layout>
    )
  )
}

export default PrivacyPolicy
