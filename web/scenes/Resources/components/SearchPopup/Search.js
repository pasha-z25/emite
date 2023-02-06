import { useRef } from 'react'
import { searchClient } from '~/utils/algolia-client'
import Hit from '~/sections/Search/Hit'
import SVG from '~/components/SVG'
import { sentimentNeutralIcon } from '~/utils/svgImages'
import { Color } from '~/utils/constants'
import {
  InstantSearch,
  SearchBox,
  Hits,
  // Configure,
  Pagination,
  connectStateResults,
} from 'react-instantsearch-dom'

import styles from './style.module.scss'

export const Search = ({ handler, popupStatus }) => {
  const wrapperRef = useRef(null)

  // const perPage = 3
  const Results = connectStateResults(({ searchState, searchResults, children }) =>
    searchState.query ? (
      searchResults && searchResults.nbHits !== 0 ? (
        <>
          {children}
          {searchResults.nbPages > 1 && <Pagination />}
        </>
      ) : (
        <p style={{ paddingTop: '1.5rem' }} className="flex align-center bold">
          <SVG content={sentimentNeutralIcon(Color.Red)} size={24} className={'mr-2x'} />
          Sorry, no results found
        </p>
      )
    ) : null
  )

  const clickHandler = (target) => {
    if (target === wrapperRef.current) {
      popupStatus(false)
    }
  }

  return (
    <div ref={wrapperRef} className={styles.searchWrapper} onClick={(e) => clickHandler(e.target)}>
      <div className="searchWindow">
        <InstantSearch searchClient={searchClient} indexName="articles">
          {/*<Configure hitsPerPage={perPage} />*/}
          <SearchBox
            autoFocus={true}
            translations={{
              placeholder: 'My question',
            }}
          />
          <Results>
            <Hits
              hitComponent={({ hit }) => (
                <Hit key={hit.objectID} item={hit} page={'resources'} callback={handler} />
              )}
            />
          </Results>
        </InstantSearch>
      </div>
    </div>
  )
}
