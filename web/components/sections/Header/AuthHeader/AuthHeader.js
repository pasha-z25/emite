import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobalState } from '~/utils/state'
import { isMobile } from '~/utils/helpers'
import { authMenu } from '~/utils/data'
import { AccountCard } from '~/sections/AccountCard'
import { Notifications } from './components/Notifications'
import SVG from '~/components/SVG'
import { mainLogo, bellOffIcon } from '~/utils/svgImages'

import styles from './style.module.scss'

export const AuthHeader = ({ resource }) => {
  const [isGiveOpened, setGiveOpened] = useGlobalState('givePopup', false)
  const { route, pathname } = useRouter()

  const mainMenu = authMenu.map(({ title, path }, index) => {
    return (
      <Link key={index} href={path === '/resources' ? `/resources/${resource}` : path}>
        <a
          className={`${
            pathname.includes(path) ? 'active ' : ''
          }menu_link relative transition opacity-80`}
        >
          {title}
        </a>
      </Link>
    )
  })

  return isMobile() ? (
    <>
      <header className={`${styles.mobileHeader} header bg-almostWhite index-1 pt-2x pb-2x`}>
        <div className="container wide flex flex-wrap align-center justify-between">
          <div className="logo">
            {route === '/' ? (
              <span dangerouslySetInnerHTML={{ __html: mainLogo() }} />
            ) : (
              <Link href="/projects">
                <a dangerouslySetInnerHTML={{ __html: mainLogo() }} />
              </Link>
            )}
          </div>
          <Link href="/settings">
            <a>
              <AccountCard />
            </a>
          </Link>
        </div>
      </header>
    </>
  ) : (
    <>
      <header className={`${styles.header} header`}>
        <div className="container wide flex align-center justify-between">
          <div className="logo">
            {route === '/' ? (
              <span dangerouslySetInnerHTML={{ __html: mainLogo() }} />
            ) : (
              <Link href="/projects">
                <a dangerouslySetInnerHTML={{ __html: mainLogo() }} />
              </Link>
            )}
          </div>
          <nav className="mainMenu flex-1">{mainMenu}</nav>
          <Notifications />
          {/*<SVG content={bellOffIcon()} size={24} className="pointer" />*/}
          <button
            className="btn full-red small ml-4x mr-1x"
            onClick={() => setGiveOpened(!isGiveOpened)}
          >
            Give
          </button>
          <AccountCard />
        </div>
      </header>
    </>
  )
}
