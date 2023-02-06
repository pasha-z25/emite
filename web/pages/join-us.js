import Head from 'next/head'
import Layout from '~/components/Layout'
import { JoinUsPage } from '~/scenes/JoinUs'

const JoinUs = () => {
  return (
    <Layout>
      <Head>
        <title>Join Us</title>
      </Head>
      <JoinUsPage />
    </Layout>
  )
}

export default JoinUs
