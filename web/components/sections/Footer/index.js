import { AuthFooter } from './AuthFooter'
import { GuestFooter } from './GuestFooter'
import { useUser } from '@auth0/nextjs-auth0'

export const Footer = () => {
  const { user } = useUser()
  return user ? <AuthFooter /> : <GuestFooter />
}
