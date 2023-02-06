import Link from 'next/link'
import SVG from '~/components/SVG'
import { Color } from '~/utils/constants'
import { chevronRight } from '~/utils/svgImages'

import styles from '../../style.module.scss'
import FAQitems from './FAQitems.json'

export const FAQlist = () => {
  const faqHandler = (target) => {
    const faqItems = document.querySelectorAll('.faq-item')
    const currentItem = target.closest('.faq-item')
    if (target.tagName === 'SPAN' && Array.from(target.classList).includes('close')) {
      faqItems.forEach((item) => {
        if (item.id === currentItem.id) {
          Array.from(item.classList).includes('active')
            ? item.classList.remove('active')
            : item.classList.add('active')
        } else {
          item.classList.remove('active')
        }
      })
    }
  }

  return (
    <>
      <div className={`${styles.faqList} faq-list`} onClick={(e) => faqHandler(e.target)}>
        {FAQitems.map((item, index) => {
          return (
            <div key={index} id={item.id} className={`faq-item ${index ? '' : 'active'}`}>
              <div className="content relative">
                <div className="title">
                  <span className="close pointer" />
                  <p className="bold transition color-darkgray">{item.title}</p>
                </div>
                <p className="small-text description">{item.description}</p>
                {item.link.url.includes('http') ? (
                  <a
                    href={item.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bold faq-link arrow-link red block"
                  >
                    {item.link.title}
                    <SVG content={chevronRight(Color.Red)} />
                  </a>
                ) : (
                  <Link href={item.link.url}>
                    <a className="bold faq-link arrow-link red block">
                      {item.link.title}
                      <SVG content={chevronRight(Color.Red)} />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
