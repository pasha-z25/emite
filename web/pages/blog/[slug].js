import Head from 'next/head'
import Layout from '~/components/Layout'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { PostPage } from '~/scenes/Blog/components/Post'
import { getImageUrl, log } from '~/utils/helpers'

let currentPage = ''
if ('window' in globalThis) {
  currentPage = window.location.href
}

const Post = ({ data }) => {
  const { post } = data
  log('Post (pages)', post)
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} key="title" />
        <meta property="og:description" content={post.description} key="description" />
        <meta
          property="og:image"
          content={`${getImageUrl(post.mainImage.asset._ref)}`}
          key="image"
        />
        <meta property="og:url" content={currentPage} key="url" />
        <meta property="og:type" content="article" />
      </Head>
      <PostPage post={post} />
    </Layout>
  )
}

export default Post

export async function getServerSideProps({ params, preview = false }) {
  const QUERY = groq`
    *[_type == "blog" && slug.current == $slug][0] {
      ...,
    }
  `
  const post = await getClient(preview).fetch(QUERY, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: { post },
    },
  }
}

// export async function getStaticPaths() {
//   const paths = await getClient()
//     .fetch(groq`*[_type == "blog" && defined(slug.current)][].slug.current`)
//     .then((res) => {
//       return [...res]
//     })
//
//   return {
//     paths: paths.map((slug) => ({ params: { slug } })),
//     fallback: false,
//   }
// }
