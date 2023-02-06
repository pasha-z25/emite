import Head from 'next/head'
import Layout from '~/components/Layout'
import { Contact } from '~/scenes/Contact'

const ContactUs = () => {
  return (
    <Layout>
      <Head>
        <title>Contact Page</title>
      </Head>
      <Contact />
    </Layout>
  )
}

export default ContactUs
