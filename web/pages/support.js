import Head from 'next/head'
import Layout from '~/components/Layout'
import { SupportPage } from '~/scenes/Support'

const Support = () => {
  return (
    <Layout>
      <Head>
        <title>Support</title>
      </Head>
      <SupportPage />
    </Layout>
  )
}

export default Support
