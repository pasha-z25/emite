import { useEffect, useState, useRef } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { getFullDate, whenBrowser, serializeMainImage } from '~/utils/helpers'
import { handleMutations } from '~/utils/helpers'
import { throttle } from '@fluss/core'

let prevIndex = -1
const serializers = {
  types: {
    mainImage: serializeMainImage,
  },
}

const articleLikesHandler = (article) => {
  const mutations = [
    {
      patch: {
        id: article._id,
        setIfMissing: {
          likes: 0,
        },
        inc: {
          likes: 1,
        },
      },
    },
  ]
  handleMutations(mutations)
}
const articleDislikesHandler = (article) => {
  const mutations = [
    {
      patch: {
        id: article._id,
        setIfMissing: {
          dislikes: 0,
        },
        inc: {
          dislikes: 1,
        },
      },
    },
  ]
  handleMutations(mutations)
}

export const ArticleBody = ({ article }) => {
  const [openList, setOpenList] = useState(true)
  const [feedbackAction, setFeedbackAction] = useState(false)
  useEffect(() => {
    whenBrowser(() => window.addEventListener('scroll', scrollHandler))
  }, [])
  const refCollectionSections = useRef([])
  const refCollectionLinks = useRef([])

  const scrollPage = (e, index) => {
    e.preventDefault()
    refCollectionLinks.current.forEach((link) => {
      link.classList.remove('color-red')
    })
    refCollectionSections.current[index].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    refCollectionLinks.current[index].classList.add('color-red')
  }

  const intervalFunction = throttle(() => {
    const currenSectionIndex = refCollectionSections.current.findIndex((section) => {
      return (
        section.offsetTop > window.scrollY + 100 &&
        section.offsetTop < window.scrollY + window.innerHeight
      )
    })
    if (prevIndex !== currenSectionIndex) {
      refCollectionLinks.current.forEach((link) => {
        link.classList.remove('color-red')
      })
      refCollectionLinks.current[currenSectionIndex]?.classList.add('color-red')
    }
    prevIndex = currenSectionIndex
  }, 15)

  const scrollHandler = () => {
    whenBrowser(() => {
      intervalFunction()
    })
  }

  return article
    .map((article) => {
      refCollectionSections.current = []
      refCollectionLinks.current = []
      return (
        <>
          <div className="article-content flex-1">
            <h3 className="h3 mb-2rem">{article.title}</h3>
            <p className="mb-2rem">Last updated: {getFullDate(article._updatedAt)}</p>
            {article.section.map((section) => {
              return (
                <div
                  ref={(ref) => ref && refCollectionSections.current.push(ref)}
                  key={section.identifier.current}
                  id={section.identifier.current}
                  className="mb-5x article-section"
                >
                  <BlockContent
                    blocks={section.content}
                    serializers={serializers}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                  />
                </div>
              )
            })}
            <hr style={{ opacity: '0.2' }} />
            {feedbackAction ? (
              <h4 className="h4 weight-800 color-darkgray mt-4x">
                <span role="img" aria-label="smile">
                  😊
                </span>{' '}
                Thanks for your feedback!
              </h4>
            ) : (
              <h4 className="h4 flex flex-wrap align-center justify-between feedback-question">
                <span className="flex">Did you find this article useful?</span>
                <span className="flex align-center">
                  <button
                    className="button green small-text"
                    onClick={() => {
                      articleLikesHandler(article)
                      setFeedbackAction(true)
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="button red small-text"
                    onClick={() => {
                      articleDislikesHandler(article)
                      setFeedbackAction(true)
                    }}
                  >
                    No
                  </button>
                </span>
              </h4>
            )}
          </div>
          <div className="page-navigation mb-5x">
            <div className="sticky-wrapper">
              <ul className={`drop-down-list list-none ${openList ? 'open' : ''}`}>
                <span
                  className="title pointer color-darkgray"
                  onClick={() => setOpenList(!openList)}
                >
                  On this page
                </span>
                {article.section.map((section, index) => {
                  return (
                    <li key={section.identifier.current}>
                      <a
                        ref={(ref) => ref && refCollectionLinks.current.push(ref)}
                        href={`#${section.identifier.current}`}
                        className={`artile-link transition`}
                        onClick={(e) => scrollPage(e, index)}
                      >
                        {section.articleTitle}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </>
      )
    })
    .fill(() => <></>)
    .extract()
}
