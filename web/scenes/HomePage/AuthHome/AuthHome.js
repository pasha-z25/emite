import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { createNewSanityUser, handleMutations, log } from '~/utils/helpers'
import { useGlobalState } from '~/utils/state'

const checkRegisteredUser = (auth0User) => {
  const registerUserMutation = [
    {
      createIfNotExists: createNewSanityUser(auth0User),
    },
  ]
  handleMutations(registerUserMutation).then((result) => log('registerUserMutation Result', result))
}

export const AuthHome = () => {
  const router = useRouter()
  const [user] = useGlobalState('user')
  const QUERY = groq`
    *[_type == "mission"] {
      _id,
      slug,
    }
  `

  useEffect(async () => {
    const projects = await getClient().fetch(QUERY)
    checkRegisteredUser(user?.auth0User)

    if (router.route === '/' && projects.length > 0) {
      router.push(`/projects/${projects[0].slug.current}`)
    }
  }, [])

  if (router.route === '/') {
    router.push(`/projects`)
  }

  return (
    <>
      <div className="container text-center pt-12x pt-18x_lg">
        <h4 className="color-darkgray mb-10x text-center">Redirecting...</h4>
      </div>
    </>
  )
}
