import Head from 'next/head'
import { groq } from 'next-sanity'
import Layout from '~/components/Layout'
import { getClient } from '~/utils/sanity.server'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ProjectsPage } from '~/scenes/Projects'

const Projects = ({ data }) => {
  const { projects } = data

  return (
    <Layout>
      <Head>
        <title>Projects</title>
      </Head>
      <ProjectsPage projects={projects} />
    </Layout>
  )
}

export default withPageAuthRequired(Projects, {
  returnTo: '/projects',
})

export async function getStaticProps() {
  const QUERY = groq`
    *[_type == "mission"] {
      ...,
    }
  `
  const projects = await getClient().fetch(QUERY)

  return {
    props: {
      data: { projects },
    },
  }
}
