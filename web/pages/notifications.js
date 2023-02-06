import Head from 'next/head'
import Layout from '~/components/Layout'
import { NotificationsPage } from '~/scenes/Notifications'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const Notifications = () => {
  return (
    <Layout>
      <Head>
        <title>Notifications</title>
      </Head>
      <NotificationsPage />
    </Layout>
  )
}

export default withPageAuthRequired(Notifications, {
  returnTo: '/notifications',
})
