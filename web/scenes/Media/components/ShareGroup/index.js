import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import SVG from '~/components/SVG'
import {
  facebookIcon,
  linkedInLargeIcon,
  twitterIcon,
  arrowCircleLeftIcon,
} from '~/utils/svgImages'

let currentPage = ''
if ('window' in globalThis) {
  currentPage = window.location.href
}
export const ShareGroup = ({ link = currentPage, callback = () => null }) => {
  const handleCopyLink = () => {
    if ('window' in globalThis) {
      const cb = navigator.clipboard
      cb.writeText(link).then(() => alert('Link copied to clipboard'))
    }
    callback()
  }
  if ('window' in globalThis) {
    return (
      <div className="shared-window color-darkgray">
        <button onClick={callback} className="btn-back">
          <SVG content={arrowCircleLeftIcon()} size={24} />
        </button>
        <h4 className="h4 title weight-800 text-center mt-4x mb-7x">
          Share this with <br />
          your social community
        </h4>
        <div className="flex align-center justify-between mb-7x">
          <FacebookShareButton url={link}>
            <span onClick={callback}>
              <span className="social-icon">
                <SVG content={facebookIcon('#3B5998')} size={40} />
              </span>
              <span>Facebook</span>
            </span>
          </FacebookShareButton>
          <LinkedinShareButton url={link}>
            <span onClick={callback}>
              <span className="social-icon">
                <SVG content={linkedInLargeIcon('#0077B5')} size={24} />
              </span>
              <span>LinkedIn</span>
            </span>
          </LinkedinShareButton>
          <TwitterShareButton url={link}>
            <span onClick={callback}>
              <span className="social-icon">
                <SVG content={twitterIcon('#55ACEE')} size={24} />
              </span>
              <span>Twitter</span>
            </span>
          </TwitterShareButton>
        </div>
        <p className="share-line flex">
          <input type="text" value={link} className="input flex-1" readOnly />
          <button type="button" onClick={handleCopyLink} className="btn-copy ml-3x">
            Copy
          </button>
        </p>
      </div>
    )
  }
}
