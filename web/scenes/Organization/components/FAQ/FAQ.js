import { faqHandler } from '~/utils/helpers'

import FAQitems from './FAQitems.json'

export const FAQlist = () => {
  return (
    <div className="card faq-wrapper" onClick={(e) => faqHandler(e.target, '.list-item')}>
      {FAQitems.map((item, index) => {
        return (
          <div key={index} id={item.id} className={`list-item ${index ? '' : 'active'}`}>
            <div className="content relative">
              <span className="icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
              <span className="close pointer" />
              <h4 className="h4 bold title transition color-darkgray">{item.title}</h4>
              <p className="description">{item.description}</p>
              <p className="stat bold color-darkgray">{item.stat}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
