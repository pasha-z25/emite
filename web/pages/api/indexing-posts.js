import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { adminClient } from '~/utils/algolia-client'

async function indexingArticles() {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ARTICLES
  const index = adminClient.initIndex(indexName)
  const QUERY = groq`
    *[_type == "article"] {
      "objectID": _id,
      ...,
    }
  `
  const articles = await getClient().fetch(QUERY)

  return index.clearObjects().then(() =>
    index.saveObjects(articles).then(({ objectIDs }) => {
      console.log(objectIDs)
      return objectIDs
    })
  )
}

async function indexingPosts() {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_POSTS
  const index = adminClient.initIndex(indexName)
  const QUERY = groq`
    *[_type == "blog"] {
      "objectID": _id,
      ...,
    }
  `
  const posts = await getClient().fetch(QUERY)
  return index.clearObjects().then(() =>
    index.saveObjects(posts).then(({ objectIDs }) => {
      console.log(objectIDs)
      return objectIDs
    })
  )
}

export default async function indexing(req, res) {
  const startTime = new Date().getTime()
  let indexingArray = []
  switch (req.body._type) {
    case 'blog':
      indexingArray = [indexingPosts()]
      return
    case 'article':
      indexingArray = [indexingArticles()]
      break
    default:
      indexingArray = [indexingArticles(), indexingPosts()]
  }

  try {
    const result = await Promise.all(indexingArray)
    const endTime = new Date().getTime()
    res.status(200).json({
      result: result,
      time: (endTime - startTime) / 1000,
    })
  } catch (e) {
    res.status(500).json(e)
  }
}
