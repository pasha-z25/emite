// import auth0 from '~/utils/auth0.js'
import Layout from '~/components/Layout'

function Profile() {
  return (
    <Layout>
      <h1>Profile</h1>
      {/* user }
      <div>
        <h3>Profile (server rendered)</h3>
        <img src={user.picture} alt="user avatar" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div> */}
    </Layout>
  )
}
{
  /*
export async function getServerSideProps({ req, res }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication
  const session = await auth0.getSession(req)

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/login',
    })
    res.end()
    return
  }

  return { props: { user: session.user } }
}
*/
}
export default Profile
