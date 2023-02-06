import { useEffect } from 'react'
import SVG from '~/components/SVG'
import BlockContent from '@sanity/block-content-to-react'
import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import { facebookIcon, likeIcon, linkedInLargeIcon, linkIcon } from '~/utils/svgImages'
import { PopUpWrapper } from '~/sections/PopUpWrapper'
import { getFullDate } from '~/utils/helpers'
import { useGlobalState } from '~/utils/state'

import styles from './style.module.scss'

let currentPage = ''
if ('window' in globalThis) {
  currentPage = window.location.href
}

const handleCopyLink = () => {
  if ('window' in globalThis) {
    const cb = navigator.clipboard
    cb.writeText(currentPage).then(() => alert('Link copied to clipboard'))
  }
}

export const ProjectContent = ({ project }) => {
  const [isModalOpened, setModalOpened] = useGlobalState('contentPopup', false)
  useEffect(() => {
    if ('window' in globalThis) {
      document.body.style.overflowY = isModalOpened ? 'hidden' : 'initial'
    }
  }, [isModalOpened])

  return (
    isModalOpened && (
      <div className={styles.wrapper}>
        <PopUpWrapper handler={() => setModalOpened(false)}>
          <div className="scroll-wrapper">
            <h3 className="project-title weight-800 color-darkgray mb-4x">
              Project {project.indexNumber}: {project.title}
            </h3>
            <div className="content-wrapper">
              <BlockContent blocks={project.body} />
            </div>
            <div className="footer-block flex flex-wrap align-center justify-between mt-4x pt-2x">
              <p>
                <span>
                  <b>Start:</b> {getFullDate(project.publishedAt)}
                </span>
                {!project.activityStatus && (
                  <span className="completion ml-2x pl-2x">
                    <b>Completion:</b> {getFullDate(project.completionDate)}
                  </span>
                )}
              </p>
              <p>
                <span className="post-like mr-2x">
                  <a
                  // className={`pointer ${isLiked ? 'like-red' : ''}`}
                  // onClick={(e) => {
                  //   postLikesHandler(e, post, sanityUser, auth0User, isLiked)
                  //   setIsLiked(!isLiked)
                  // }}
                  >
                    <SVG content={likeIcon()} size={24} />
                  </a>
                </span>
                <FacebookShareButton url={currentPage}>
                  <span>
                    <SVG content={facebookIcon()} size={24} />
                  </span>
                </FacebookShareButton>
                <LinkedinShareButton url={currentPage}>
                  <span>
                    <SVG content={linkedInLargeIcon()} size={24} className={'ml-2x'} />
                  </span>
                </LinkedinShareButton>
                <button type="button" onClick={handleCopyLink} className={'ml-2x'}>
                  <SVG content={linkIcon()} size={24} />
                </button>
              </p>
            </div>
          </div>
        </PopUpWrapper>
      </div>
    )
  )
}
