import Head from 'next/head'
import Layout from '~/components/Layout'
import { useGlobalState } from '~/utils/state'
import { Account } from '~/scenes/UserAccount'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const Settings = () => {
  const [user] = useGlobalState('user')
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
      <Account user={user} />
    </Layout>
  )
}

export default withPageAuthRequired(Settings, {
  returnTo: '/settings',
})
