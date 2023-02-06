import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Header } from './sections/Header'
import { Footer } from './sections/Footer'
import { Cookies } from './sections/Cookies'
import { Loader } from '~/components/Loader'
import { gql, useQuery } from '@apollo/client'
import { getImageUrl, getSanityUser, handleMutations, whenBrowser } from '~/utils/helpers'
import { GiveForm } from '~/sections/GiveForm'
import { ContactsPopup } from '~/sections/ContactsPopup'
import { useGlobalState } from '~/utils/state'
import { FirebaseServices } from '~/utils/firebase'
import { useNotification } from '~/scenes/Notifications/components/helpers'

function Layout({ children }) {
  const [loader] = useGlobalState('loader', false)
  let cookiePopup = false
  whenBrowser(() => (cookiePopup = localStorage.getItem('cookie')))
  const [cookie, setCookie] = useState(!cookiePopup)
  const [sanityUser, auth0User] = getSanityUser()
  const [user, setUser] = useGlobalState('user', { sanityUser, auth0User })
  useNotification()
  useEffect(() => {
    if (sanityUser && auth0User) {
      setUser({ sanityUser, auth0User })
    }
  }, [sanityUser, auth0User])

  useEffect(() => {
    const addUserNotifyToken = (auth0User, token) => {
      const addTokenMutation = [
        {
          patch: {
            id: user?.auth0User.sub.replace('|', '-'),
            setIfMissing: {
              tokens: [],
            },
            unset: [`tokens[token=="${token}"]`],
            insert: {
              after: 'tokens[-1]',
              items: [
                {
                  token,
                  _key: token,
                },
              ],
            },
          },
        },
      ]
      if (Object.keys(user?.sanityUser).length) {
        if (user?.sanityUser?.tokens) {
          let isTokenExist = user?.sanityUser?.tokens.findIndex((tokens) => {
            return tokens.token === token
          })
          !~isTokenExist && handleMutations(addTokenMutation)
        } else {
          handleMutations(addTokenMutation)
        }
      }
    }

    if (user?.auth0User) {
      const firebase = FirebaseServices.instance
      firebase
        .getNotificationToken()
        .then((currentToken) => {
          addUserNotifyToken(user?.auth0User, currentToken)
          firebase.registerNotificationWorker()
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. Permission was not granted', err)
        })
    }
  }, [user.sanityUser, user.auth0User])

  const QUERY = gql`
    query Config {
      SiteConfig(id: "global-config") {
        _id
        title
        description
        url
        logo {
          asset {
            _rev
          }
        }
      }
      allArticle {
        _id
        title
        slug {
          current
        }
      }
    }
  `
  const { data, loading, error } = useQuery(QUERY)
  if (loading) {
    return <Loader />
  }
  if (error) {
    console.error(error)
    return null
  }
  const { SiteConfig, allArticle } = data

  const acceptCookies = () => {
    setCookie(false)
    localStorage.setItem('cookie', 'accepted')
  }
  const resource = allArticle[0]?.slug?.current
  return (
    SiteConfig && (
      <>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <meta charSet="utf-8" />
          <title>{SiteConfig?.title}</title>
          <meta name="description" content={SiteConfig?.description} />
          <meta property="og:title" content={SiteConfig?.title} key="title" />
          <meta property="og:description" content={SiteConfig?.description} key="description" />
          <meta
            property="og:image"
            content={getImageUrl(SiteConfig?.logo?.asset?._ref)}
            key="image"
          />
          <meta property="og:site_name" content={SiteConfig?.title} />
          <meta property="og:url" content={SiteConfig?.url} key="url" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"
          />
        </Head>
        <Header resource={resource} />
        <main className="main-content">{children}</main>
        <Footer />
        <GiveForm />
        <ContactsPopup />
        {cookie && <Cookies callback={acceptCookies} />}
        {loader && <Loader />}
      </>
    )
  )
}

export default Layout
