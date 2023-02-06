import { useEffect, useState } from 'react'
import { debounce } from '@fluss/core'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
import { PostCard } from './components/BlogCard'
import { createNewSanityUser, handleMutations } from '~/utils/helpers'
import { blogOptions } from '~/utils/constants'
import SVG from '~/components/SVG'
import { searchIcon } from '~/utils/svgImages'
import { useGlobalState } from '~/utils/state'
import { Search } from '~/sections/Search'
import styles from './style.module.scss'

const usePosts = () => {
  const [toggle, setToggle] = useState(false)
  const [postsOrder] = useGlobalState('postsOrder', blogOptions.defaultSorting)
  const [posts, setPosts] = useGlobalState('posts', [])

  const QUERY = groq`
    *[_type == "blog"] | order(${postsOrder})[0..${
    posts.length ? posts.length + blogOptions.addNumberOfPosts : blogOptions.startPostsLimit
  }] {
      _id,
      _rev,
      title,
      description,
      publishedAt,
      reading,
      slug {
        current
      },
      mainImage {
        asset {
          _ref
        },
        alt,
        caption
      },
      views,
      likes
    }
  `

  useEffect(async () => {
    setPosts(await getClient().fetch(QUERY))
  }, [postsOrder, toggle])

  return [posts, () => setToggle((old) => !old)]
}

const useCountOfAllPosts = () => {
  const [count, setCount] = useState(0)
  const QUERY = groq`
    *[_type == "blog"] {
      _id,
    }
  `
  useEffect(() => {
    getClient()
      .fetch(QUERY)
      .then((list) => list.length)
      .then(setCount)
  }, [])

  return count
}

export const postLikesHandler = (e, post, sanityUser, auth0User, isLiked) => {
  const likedMutations = [
    {
      createIfNotExists: createNewSanityUser(auth0User),
    },
    {
      patch: {
        id: post._id,
        setIfMissing: {
          likes: 0,
        },
        inc: {
          likes: 1,
        },
      },
    },
    {
      patch: {
        id: auth0User.sub.replace('|', '-'),
        setIfMissing: {
          posts: [],
        },
        insert: {
          after: 'posts[-1]',
          items: [
            {
              title: post.title,
              postKey: post._id,
              publishedAt: post.publishedAt,
              _key: post._id,
            },
          ],
        },
      },
    },
  ]
  const dislikedMutations = [
    {
      patch: {
        id: post._id,
        setIfMissing: {
          likes: 0,
        },
        dec: {
          likes: 1,
        },
      },
    },
    {
      patch: {
        id: auth0User.sub.replace('|', '-'),
        unset: [`posts[_key=="${post._id}"]`],
      },
    },
  ]
  handleMutations(isLiked ? dislikedMutations : likedMutations)
  const link = e.target.closest('a')
  link.classList.add('like')
  link.classList.add('like-red')
  setTimeout(() => link.classList.remove('like'), 500)
}

const intervalFunction = debounce((predicate, refetchPosts) => {
  if (window.pageYOffset > document.body.clientHeight - window.innerHeight * 2) {
    if (predicate()) {
      refetchPosts()
    }
  }
}, 20)

export const BlogPage = () => {
  const [user] = useGlobalState('user')
  const [sortCurrentStatus, setCurrentStatus] = useState(blogOptions.selectedSorting)
  const [sortListStatus, setSortListStatus] = useState(false)
  const [isSearchOpened, setSearchOpened] = useGlobalState('searchPopup', false)
  const [, setPostsOrder] = useGlobalState('postsOrder', blogOptions.selectedSorting)
  const allPostsCount = useCountOfAllPosts()
  const [currentPosts, loadPosts] = usePosts()

  useEffect(() => {
    const scrollHandler = () =>
      intervalFunction(() => allPostsCount > currentPosts.length, loadPosts)

    if ('window' in globalThis) {
      window.addEventListener('scroll', scrollHandler)
    }
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [allPostsCount, currentPosts])

  const changePostsOrder = (value, current) => {
    setPostsOrder(value)
    setCurrentStatus(current)
    setSortListStatus(!sortListStatus)
  }

  return (
    <>
      <div className={`${styles.wrapper} container section-indent`} style={{ maxWidth: '1032px' }}>
        <div className="relative mt-4x mt-2x_lg mb-4x mb-7x_lg">
          <form className="form-imitation">
            <label className="icon search relative flex align-center">
              <SVG content={searchIcon()} size={18} className={'mr-1x'} />
              <input
                readOnly
                type="text"
                placeholder="Enter your question"
                onClick={() => setSearchOpened(!isSearchOpened)}
              />
            </label>
            <input type="submit" className="hidden" value="Submit" />
          </form>
          <div className={`menu_wrapper transition ${sortListStatus ? 'open' : ''}`}>
            <span
              className="sortCurrentStatus small-text weight-800 color-darkgray transition pointer"
              onClick={() => setSortListStatus(!sortListStatus)}
            >
              {sortCurrentStatus}
            </span>
            <p className="button pointer" onClick={() => setSortListStatus(!sortListStatus)}>
              <span />
              <span />
              <span />
            </p>
            <ul className="category-list list-none transition small-text">
              <li
                className="pointer mb-1x"
                onClick={() => changePostsOrder('views desc', 'Popular')}
              >
                Popular
              </li>
              <li
                className="pointer mb-1x"
                onClick={() => changePostsOrder('likes desc', 'Trending')}
              >
                Trending
              </li>
              {user?.sanityUser && (
                <li
                  className="pointer mb-1x"
                  onClick={() => changePostsOrder('likes desc', 'Liked')}
                >
                  Liked
                </li>
              )}
              <li
                className="pointer mb-1x"
                onClick={() => changePostsOrder('publishedAt desc', 'Newest')}
              >
                Newest
              </li>
              <li
                className="pointer mb-1x"
                onClick={() => changePostsOrder('publishedAt asc', 'Oldest')}
              >
                Oldest
              </li>
            </ul>
          </div>
        </div>
        {currentPosts.map((post) => {
          return <PostCard key={post._id} post={post} users={[user?.sanityUser, user?.auth0User]} />
        })}
      </div>
      <Search index={`${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_POSTS}`} page={'blog'} />
    </>
  )
}
