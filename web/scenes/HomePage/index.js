import { Loader } from '~/components/Loader'
import { Error } from '~/components/Error'
import { GuestHome } from './GuestHome'
import { AuthHome } from './AuthHome'
import { useUser } from '@auth0/nextjs-auth0'

export const HomePage = () => {
  const { user, error, isLoading } = useUser()
  if (isLoading) return <Loader />
  if (error) return <Error message={error.message} />

  return user ? <AuthHome /> : <GuestHome />
}
