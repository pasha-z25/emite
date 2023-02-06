import Head from 'next/head'
import Layout from '~/components/Layout'
import { gql, useQuery } from '@apollo/client'
import { Loader } from '~/components/Loader'
import BlockContent from '@sanity/block-content-to-react'

const TermsConditions = () => {
  const QUERY = gql`
    query Config {
      SiteConfig(id: "global-config") {
        termsAndConditionsRaw
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
          <title>Terms and Conditions</title>
        </Head>
        <div className="container section-indent">
          <h1 className="h1 weight-800 color-darkgray text-center pt-5x mb-5x">
            Terms and Conditions
          </h1>
          <div className="article-content">
            <BlockContent blocks={data.SiteConfig.termsAndConditionsRaw} />
          </div>
        </div>
      </Layout>
    )
  )
}

export default TermsConditions
