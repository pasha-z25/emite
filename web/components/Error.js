import Link from 'next/link'
import styles from './Error.module.scss'

export const Error = ({ message }) => {
  return (
    <div className={`${styles.errorWrapper} flex flex-column align-center justify-center`}>
      <h4 className="mb-2rem container text-center">{message}</h4>
      <Link href={'/'}>
        <a>Visit home page</a>
      </Link>
    </div>
  )
}
