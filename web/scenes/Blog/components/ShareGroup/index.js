import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import SVG from '~/components/SVG'
import { facebookIcon, linkedInLargeIcon, linkIcon } from '~/utils/svgImages'

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
  return 'window' in globalThis ? (
    <>
      <FacebookShareButton url={link}>
        <span onClick={callback}>
          <SVG content={facebookIcon()} size={24} />
        </span>
      </FacebookShareButton>
      <LinkedinShareButton url={link}>
        <span onClick={callback}>
          <SVG content={linkedInLargeIcon()} size={24} className={'ml-2x'} />
        </span>
      </LinkedinShareButton>
      <button type="button" onClick={handleCopyLink} className={'ml-2x'}>
        <SVG content={linkIcon()} size={24} />
      </button>
    </>
  ) : null
}
