import Head from 'next/head'
import Layout from '~/components/Layout'
import { MediaPage } from '~/scenes/Media'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const Media = () => {
  return (
    <Layout>
      <Head>
        <title>Media</title>
      </Head>
      <MediaPage />
    </Layout>
  )
}

export default withPageAuthRequired(Media, {
  returnTo: '/media',
})
