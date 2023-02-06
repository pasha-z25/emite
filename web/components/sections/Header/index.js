import { AuthHeader } from './AuthHeader'
import { GuestHeader } from './GuestHeader'
import { useUser } from '@auth0/nextjs-auth0'

export const Header = ({ resource }) => {
  const { user } = useUser()

  return user ? <AuthHeader resource={resource} /> : <GuestHeader resource={resource} />
}
