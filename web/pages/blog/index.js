import Head from 'next/head'
import Layout from '~/components/Layout'
import { BlogPage } from '~/scenes/Blog'

const Blog = () => {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
      </Head>
      <BlogPage />
    </Layout>
  )
}

export default Blog
