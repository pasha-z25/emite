import Link from 'next/link'
import SVG from '~/components/SVG'
import { chevronRight, questionAskIcon } from '~/utils/svgImages'

export default function Hit({ item, page, callback }) {
  return (
    <>
      <p className="flex align-center">
        <SVG content={questionAskIcon('#F94144')} size={24} className={'mr-2x'} />
        <span className="flex-1">{item.title}</span>
        <Link href={`/${page}/${item.slug?.current}`}>
          <a onClick={callback} className="more color-red pointer">
            Read more
          </a>
        </Link>
        <SVG content={chevronRight()} size={16} className={'ml-1x'} />
      </p>
    </>
  )
}
