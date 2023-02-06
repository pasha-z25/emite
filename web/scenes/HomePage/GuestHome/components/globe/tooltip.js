import styles from '~/scenes/HomePage/GuestHome/components/globe/style.module.scss'
import SVG from '~/components/SVG'
import { useState } from 'react'

const Tooltip = ({ props }) => {
  const { marker, position = { x: 0, y: 0 } } = props
  const [sizes, setSizes] = useState(null)
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
          {marker.title}
        </h3>
        <SVG content={marker.flag} size={24} />
      </div>
      <div className="textContainer">
        <span className="contentTitle">Partner:</span>
        <span className="contentInfo">{marker.partner}</span>
      </div>
      <div className="textContainer">
        <span className="contentTitle">Project:</span>
        <span className="contentInfo">{marker.project}</span>
      </div>
      <div className="textContainer">
        <span className="contentTitle">People served:</span>
        <span className="contentInfo">{marker.peopleServed}</span>
      </div>
      <span className="marker" style={{ background: marker.color }} />
      <span className="marker_wrap" />
    </div>
  )
}

export default Tooltip
