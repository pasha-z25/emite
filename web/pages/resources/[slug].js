import { useEffect, useState } from 'react'
import Head from 'next/head'
import { some } from '@fluss/core'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import Layout from '~/components/Layout'
import { AsideMenu } from '~/scenes/Resources/components/AsideMenu'
import { ArticleBody } from '~/scenes/Resources/components/Article'
import { Search } from '~/scenes/Resources/components/SearchPopup'
import SVG from '~/components/SVG'
import { searchIcon } from '~/utils/svgImages'
import { getImageUrl, log } from '~/utils/helpers'

import styles from '~/scenes/Resources/style.module.scss'

let currentPage = ''
if ('window' in globalThis) {
  currentPage = window.location.href
}

const Post = ({ data }) => {
  const { article } = data
  log('Article (pages)', article)
  const [searchPopup, setSearchPopup] = useState(false)
  useEffect(() => {
    if ('window' in globalThis) {
      document.body.style.overflowY = searchPopup ? 'hidden' : 'initial'
    }
  }, [searchPopup])
  const searchHandler = () => {
    setSearchPopup(false)
  }

  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} key="title" />
        <meta property="og:description" content={article.description} key="description" />
        <meta
          property="og:image"
          content={`${getImageUrl(article.mainImage.asset._ref)}`}
          key="image"
        />
        <meta property="og:url" content={currentPage} key="url" />
        <meta property="og:type" content="article" />
      </Head>
      <div className="container">
        <div className={`${styles.wrapper} wrapper section-indent flex`}>
          <div className="category-navigation">
            <div className="sticky-wrapper relative">
              <form className="form-imitation mb-2rem">
                <label className="icon search relative flex align-center">
                  <SVG content={searchIcon()} size={18} className={'mr-1x'} />
                  <input
                    readOnly
                    type="text"
                    placeholder="Enter your question"
                    onClick={() => setSearchPopup(true)}
                  />
                </label>
                <input type="submit" className="hidden" value="Submit" />
              </form>
              <AsideMenu />
            </div>
          </div>
          <ArticleBody article={some(article)} />
        </div>
        {searchPopup && <Search handler={searchHandler} popupStatus={setSearchPopup} />}
      </div>
    </Layout>
  )
}

export default Post

export async function getServerSideProps({ params, preview = false }) {
  const QUERY = groq`
    *[_type == "article" && slug.current == $slug][0] {
      ...,
    }
  `
  const article = await getClient(preview).fetch(QUERY, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: { article },
    },
  }
}

// export async function getStaticProps({ params, preview = false }) {
//   const QUERY = groq`
//     *[_type == "article" && slug.current == $slug][0] {
//       ...,
//     }
//   `
//   const article = await getClient(preview).fetch(QUERY, {
//     slug: params.slug,
//   })
//
//   return {
//     props: {
//       preview,
//       data: { article },
//     },
//   }
// }

// export async function getStaticPaths() {
//   const paths = await getClient()
//     .fetch(groq`*[_type == "article" && defined(slug.current)][].slug.current`)
//     .then((res) => {
//       return [...res]
//     })
//
//   return {
//     paths: paths.map((slug) => ({ params: { slug } })),
//     fallback: false,
//   }
// }
