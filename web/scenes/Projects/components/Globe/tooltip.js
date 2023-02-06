import { useState } from 'react'
import styles from '~/scenes/Projects/components/Globe/style.module.scss'
import Link from 'next/link'

const Tooltip = ({ props, callback }) => {
  const { marker, position = { x: 0, y: 0 }, centerCamera } = props
  const [sizes, setSizes] = useState(null)

  const onMarkerClick = () => {
    callback.onDefocus()
    centerCamera()
  }

  return (
    <div
      ref={(ref) => !sizes && setSizes({ height: ref?.clientHeight, width: ref?.clientWidth })}
      className={`${styles.details} details`}
      style={{
        left: `${position.x - sizes?.width / 2}px`,
        top: `${position.y - sizes?.height - 5}px`,
      }}
    >
      <div className="textContainer">
        <h3 className="textTitle" title={marker.title}>
          <Link href={`/projects/${marker.slug}`}>
            <a onClick={onMarkerClick}>
              Project {marker.indexNumber}: {marker.title}
            </a>
          </Link>
        </h3>
      </div>
      <Link href={`/projects/${marker.slug}`}>
        <span onClick={onMarkerClick} className="marker" style={{ background: marker.color }} />
      </Link>
      <span className="marker_wrap" />
    </div>
  )
}

export default Tooltip
