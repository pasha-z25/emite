import Link from 'next/link'
import { faqHandler } from '~/utils/helpers'

import styles from '../../style.module.scss'

export const FAQlist = () => {
  return (
    <>
      <div
        className={`${styles.faqList} faq-list`}
        onClick={(e) => faqHandler(e.target, '.faq-item')}
      >
        <div id="item-0" className="faq-item active">
          <div className="content relative pl-5x pr-5x">
            <div className="title">
              <span className="close pointer" />
              <p className="bold transition color-darkgray">How do I support Mite?</p>
            </div>
            <p className="small-text description">
              Support our operations by donating to the
              <Link href="/contact?category=sponsor">
                <a className="color-red bold"> Mighty Fund </a>
              </Link>
              or donate to any projects of your choice
              <Link href="/contact?category=sponsor">
                <a className="color-red bold"> here</a>
              </Link>
              .
            </p>
          </div>
        </div>
        <div id="item-1" className="faq-item">
          <div className="content relative pl-5x pr-5x">
            <div className="title">
              <span className="close pointer" />
              <p className="bold transition color-darkgray">
                How do I set up automatic payments so I can give regularly?
              </p>
            </div>
            <p className="small-text description">
              It&apos;s easy! Select the Give Monthly option on the
              <Link href="/contact?category=sponsor">
                <a className="color-red bold"> Donation page</a>
              </Link>
              .
            </p>
          </div>
        </div>
        <div id="item-2" className="faq-item">
          <div className="content relative pl-5x pr-5x">
            <div className="title">
              <span className="close pointer" />
              <p className="bold transition color-darkgray">How do I create a Mite account?</p>
            </div>
            <p className="small-text description">
              Head to our
              <Link href="/signup">
                <a className="color-red bold"> Sign Up </a>
              </Link>
              page to create an account. You will receive instant confirmation & then you are ready
              to access the platform.
            </p>
          </div>
        </div>
        <div id="item-3" className="faq-item">
          <div className="content relative pl-5x pr-5x">
            <div className="title">
              <span className="close pointer" />
              <p className="bold transition color-darkgray">How do I refer a project?</p>
            </div>
            <p className="small-text description">
              Fill out our
              <Link href="/contact?category=refer">
                <a className="color-red bold"> Referral form </a>
              </Link>
              & our team will be in touch shortly to follow up. You can also visit our
              <Link href="/join-us">
                <a className="color-red bold"> Join Us </a>
              </Link>
              page to learn more about how to get involved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
