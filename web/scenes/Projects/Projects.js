import { useRouter } from 'next/router'
import { Loader } from '~/components/Loader'

export const ProjectsPage = ({ projects }) => {
  const router = useRouter()
  if (router.route === '/projects' && projects.length > 0) {
    router.push(`/projects/${projects[0].slug.current}`)
  }
  return <Loader />
}
