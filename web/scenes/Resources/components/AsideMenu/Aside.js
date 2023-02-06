import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { Loader } from '~/components/Loader'

export const AsideMenu = () => {
  const [categoryMenuState, setCategoryMenuState] = useState(false)
  const router = useRouter()
  const QUERY = gql`
    query Articles {
      allArticleCategory {
        _id
        title
      }
      allArticle {
        _id
        title
        slug {
          current
        }
        category {
          _id
          title
        }
      }
    }
  `
  const { data, loading, error } = useQuery(QUERY)
  const { allArticleCategory, allArticle } = data || {}
  if (loading) {
    return <Loader />
  }
  if (error) {
    console.error(error)
    return null
  }
  return (
    <div className={`menu_wrapper transition ${categoryMenuState ? 'open' : ''}`}>
      <p className="button" onClick={() => setCategoryMenuState(!categoryMenuState)}>
        <span />
        <span />
        <span />
      </p>
      <ul className="category-list list-none transition">
        {allArticleCategory?.map((category, index) => {
          return (
            <li key={category._id} className="mb-1rem">
              <ul className={`${index ? '' : 'open '}article-list list-none drop-down-list`}>
                <span
                  className="block title pointer color-darkgray"
                  onClick={(e) => {
                    e.target.closest('.drop-down-list').classList.toggle('open')
                  }}
                >
                  {category.title}
                </span>
                {allArticle?.map((article) => {
                  if (category._id === article.category._id) {
                    return (
                      <li
                        key={article._id}
                        className={`pointer ${
                          router.query.slug === article.slug.current ? 'color-red' : ''
                        }`}
                      >
                        <Link href={`/resources/${article.slug.current}`}>
                          <a>{article.title}</a>
                        </Link>
                      </li>
                    )
                  }
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
