import Head from 'next/head'
import { groq } from 'next-sanity'
import Layout from '~/components/Layout'
import { getClient } from '~/utils/sanity.server'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ProjectPage } from '~/scenes/Projects/components/Project'
import { getImageUrl, log } from '~/utils/helpers'

let currentPage = ''
if ('window' in globalThis) {
  currentPage = window.location.href
}

const Project = ({ data: { project } }) => {
  log('Project (pages)', project)
  return (
    <Layout>
      <Head>
        <title>{project.title}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} key="title" />
        <meta property="og:description" content={project.description} key="description" />
        <meta
          property="og:image"
          content={`${getImageUrl(project.mainImage.asset._ref)}`}
          key="image"
        />
        <meta property="og:url" content={currentPage} key="url" />
        <meta property="og:type" content="article" />
      </Head>
      <ProjectPage project={project} />
    </Layout>
  )
}

export default withPageAuthRequired(Project, {
  returnTo: '/projects',
})

export async function getServerSideProps({ params, preview = false }) {
  const QUERY = groq`
    *[_type == "mission" && slug.current == $slug][0] {
      ...,partner->,category->,location->,updates | order(publishedAt desc)
    }
  `
  const project = await getClient(preview).fetch(QUERY, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: { project },
    },
  }
}

// export async function getStaticPaths() {
//   const paths = await getClient()
//     .fetch(groq`*[_type == "mission" && defined(slug.current)][].slug.current`)
//     .then((res) => {
//       return [...res]
//     })
//
//   return {
//     paths: paths.map((slug) => ({ params: { slug } })),
//     fallback: false,
//   }
// }
