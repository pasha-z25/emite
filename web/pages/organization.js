import Head from 'next/head'
import Layout from '~/components/Layout'
import { OrganizationPage } from '~/scenes/Organization'

const Organization = () => {
  return (
    <Layout>
      <Head>
        <title>Organization</title>
      </Head>
      <OrganizationPage />
    </Layout>
  )
}

export default Organization
