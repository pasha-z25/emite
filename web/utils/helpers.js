import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import client from './sanity-client'
import { groq } from 'next-sanity'
import { getClient } from '~/utils/sanity.server'
const { monthsOfHheYear, Direction } = require('./constants')

const log = (groupName, ...values) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(groupName)
    console.log(...values)
    console.groupEnd()
  }
}

const randomNumberInInterval = (min, max) => Math.floor(Math.random() * (max - min)) + min

const getReadableDate = (date) => {
  return `${(new Date(date).getMonth() + 1).toString().padStart(2, '0')}.${new Date(date)
    .getDate()
    .toString()
    .padStart(2, '0')}.${new Date(date).getFullYear()}`
}

const getFullDate = (date) => {
  return `${new Date(date).getDate().toString().padStart(2, '0')} ${
    monthsOfHheYear[new Date(date).getMonth()]
  } ${new Date(date).getFullYear()}`
}

const getShortDate = (date) => {
  return `${monthsOfHheYear[new Date(date).getMonth()].substring(0, 3)} ${new Date(date)
    .getDate()
    .toString()
    .padStart(2, '0')}`
}

const getInternationalDate = (date) => {
  return new Date(date).toLocaleString().substr(0, 10)
}

const whenBrowser = (callIfTrue, callIfFalse = () => null) =>
  'window' in globalThis ? callIfTrue() : callIfFalse()

const scrollWindowToTop = () =>
  whenBrowser(() =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  )

const handleMutations = (mutations) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mutations,
          returnIds: true,
          // returnDocuments: true,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        log('Sanity mutation result', result)
        resolve(result)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const faqHandler = (target, selector) => {
  const faqItems = document.querySelectorAll(selector)
  const currentItem = target.closest(selector)
  if (target.tagName === 'SPAN' && Array.from(target.classList).includes('close')) {
    faqItems.forEach((item) => {
      if (item.id === currentItem.id) {
        Array.from(item.classList).includes('active')
          ? item.classList.remove('active')
          : item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })
  }
}
const getImageUrl = (source) => {
  const builder = imageUrlBuilder(client)
  return builder.image(source)
}

const getUrlFromId = (ref) => {
  // Example ref: file-207fd9951e759130053d37cf0a558ffe84ddd1c9-mp3
  // We don't need the first part, unless we're using the same function for files and images
  const [, id, extension] = ref.split('-')
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`
}

const getYoutubeVideoId = (link) => {
  const startSearch = link.indexOf('?')
  const endSearch = link.indexOf('&')
  return link.substring(startSearch + 3, endSearch.toString() === '-1' ? link.length : endSearch)
}

const getDirection = (() => {
  let previousYScroll = globalThis.scrollY | 0
  return (currentScroll) => {
    const direction =
      previousYScroll === currentScroll
        ? Direction.NEUTRAL
        : previousYScroll > currentScroll
        ? Direction.UP
        : Direction.DOWN
    previousYScroll = currentScroll
    return direction
  }
})()

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

// const isMobile = () => window.innerWidth < 992
const isMobile = () => {
  const size = useWindowSize()
  return size.width < 992
}

const fetchAuthenticationToken = async () => {
  let token = ''
  await fetch(`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
      client_secret: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET}`,
      audience: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/`,
    }),
  })
    .then((response) => response.json())
    .then(({ access_token }) => {
      token = access_token
      log(
        'Updated access token result',
        access_token
          ? 'access_token is successfully updated'
          : 'Something went wrong... access_token is undefined'
      )
    })
    .catch((error) => console.error(error))

  return token
}

const useAuthenticationToken = () => {
  const [token, setToken] = useState('')
  useEffect(() => {
    fetchAuthenticationToken().then(setToken)
  }, [])
  return token
}

const serializeMainImage = (props) => {
  return (
    <figure className="notAbsolute max-content">
      <Image src={`${getImageUrl(props.node.asset._ref)}`} alt={props.node.alt} layout="fill" />
      <figcaption>{props.node.caption}</figcaption>
    </figure>
  )
}

const getSubstringOfLength = (string = '', length = 100) => {
  return `${string.substring(0, length)}${string.length > length ? '...' : ''}`
}

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
    )

const getSanityUser = () => {
  const [sanityUser, setSanityUser] = useState({})
  const { user: auth0User } = useUser()
  const QUERY = groq`
    *[_type == "user" && privateKey == $key] {
      ...,
    }
  `
  useEffect(() => {
    if (sanityUser && auth0User) {
      getClient()
        .fetch(QUERY, {
          key: auth0User.sub || '',
        })
        .then((sanityUsers) => setSanityUser(sanityUsers[0] || {}))
    }
  }, [auth0User])
  return [sanityUser, auth0User]
}

const resolvePromise = (promise, initialState = [], deps = []) => {
  const [value, setValue] = useState(initialState)
  const [error, setError] = useState(null)
  useEffect(() => {
    promise.then(setValue, setError)
  }, [...deps])
  return { value, error }
}

const fetchSvgParser = async (url) => {
  const response = await fetch(url)
  return response.text()
}

const getCurrencyValue = (number) => `$${new Intl.NumberFormat('en-US').format(number)}`

const getImageUrlFromMedia = (entity) => {
  let messageIcon = ''
  if (entity.media && entity.media.length) {
    switch (entity.media[0]._type) {
      case 'imageCollection':
        messageIcon = getImageUrl(entity.media[0].asset._ref)
        break
      case 'mediaCollection':
        messageIcon = getImageUrl(entity.media[0].preview.asset._ref)
        break
      default:
        messageIcon = ''
    }
  }
  return messageIcon
}

const createNewSanityUser = (auth0User) => {
  return {
    _id: auth0User.sub.replace('|', '-'),
    _type: 'user',
    privateKey: auth0User.sub,
    slug: {
      current: `${auth0User.given_name}__${auth0User.sub.replace('|', '-')}`,
    },
    givenName: auth0User.given_name,
    familyName: auth0User.family_name,
    email: auth0User.email,
    phone: ' ',
    address: {
      city: '',
      country: '',
      line1: '',
      postalCode: '',
      state: '',
    },
    avatar: auth0User.picture,
    tokens: [],
    projects: [],
    posts: [],
    media: [],
    notifications: [],
    lastNotificationsView: new Date().toISOString(),
    notificationsOptions: {
      marketingStatus: true,
      projectUpdatesStatus: true,
      transactionStatus: true,
      newProjectStatus: true,
    },
  }
}

export {
  log,
  randomNumberInInterval,
  getReadableDate,
  getFullDate,
  getShortDate,
  getInternationalDate,
  whenBrowser,
  scrollWindowToTop,
  faqHandler,
  handleMutations,
  getImageUrl,
  getDirection,
  useWindowSize,
  isMobile,
  useAuthenticationToken,
  serializeMainImage,
  getSubstringOfLength,
  toDataURL,
  getUrlFromId,
  getYoutubeVideoId,
  getSanityUser,
  resolvePromise,
  fetchSvgParser,
  getCurrencyValue,
  getImageUrlFromMedia,
  createNewSanityUser,
}
