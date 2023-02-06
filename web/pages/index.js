import Head from 'next/head'
import Layout from '~/components/Layout'
import { HomePage } from '~/scenes/HomePage'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <HomePage />
    </Layout>
  )
}
