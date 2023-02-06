import { Loader } from '~/components/Loader'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'

export const ResourcesPage = () => {
  const QUERY = gql`
    query Articles {
      allArticle {
        _id
        _updatedAt
        title
        slug {
          current
        }
      }
    }
  `
  const { data, loading, error } = useQuery(QUERY)
  const { allArticle } = data || {}
  const router = useRouter()
  if (loading) {
    return <Loader />
  }
  if (error) {
    console.error(error)
    return null
  }
  if (router.route === '/resources') {
    router.push(`/resources/${allArticle[0].slug.current}`)
  }
  return <Loader />
}
