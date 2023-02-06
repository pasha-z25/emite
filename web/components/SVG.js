const SVG = ({ content, size = 16, className = '' }) => {
  return (
    <span
      className={`svg-wrap ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        display: 'inline-block',
        minWidth: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: '0.5em',
      }}
    />
  )
}

export default SVG
