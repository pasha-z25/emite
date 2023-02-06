import styles from './Loader.module.scss'
import imageLoader from 'public/images/image_funny_loader.gif'

export const Loader = () => {
  const textLoader = true // if FALSE return gif animation
  return (
    <div className={`${styles.loaderWrapper} flex align-center justify-center`}>
      {textLoader ? (
        <>
          {/*<h2>Loading...</h2>*/}
          <div className={styles.ldsRing}>
            <div />
            <div />
            <div />
            <div />
          </div>
        </>
      ) : (
        <img src={imageLoader.src} alt="Loading..." />
      )}
    </div>
  )
}
