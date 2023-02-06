import Link from 'next/link'
import styles from './style.module.scss'

export const Page404 = () => {
  return (
    <div className={`${styles.wrapper} wrapper`}>
      <div className="container text-center pt-12x pt-16x_lg pseudo_before pseudo_after">
        <h3 className="h3 title relative color-darkgray max-content index-1 mx-auto mb-2x pseudo_before_circle_white pseudo_after">
          <span className="block relative big404" />
          Whoops!
          <br />
          Something went wrong
        </h3>
        <p className="description relative index-1 mx-auto pseudo_before pseudo_after_circle_white mb-4x mb-6x_lg">
          Sorry, we cannot find this page. It may have been deleted or no longer exists.
        </p>
        <Link href="/">
          <a className="btn full-red">Back to Home</a>
        </Link>
      </div>
    </div>
  )
}
