import Head from 'next/head'
import { Header } from '~/components/sections/Header'
import { Page404 } from '~/scenes/ErrorPage'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Error 404 - page not found</title>
      </Head>
      <Header />
      <main className="main-content">
        <Page404 />
      </main>
    </>
  )
}
