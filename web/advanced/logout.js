import auth0 from '~/utils/auth0.js'

export default async function logout(req, res) {
  try {
    await auth0.handleLogout(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
