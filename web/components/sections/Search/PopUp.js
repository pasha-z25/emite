import { useEffect, useRef } from 'react'
import { searchClient } from '~/utils/algolia-client'
import { useGlobalState } from '~/utils/state'
import Hit from './Hit'
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

export const Search = ({ index, page }) => {
  const wrapperRef = useRef(null)
  const [isModalOpened, setModalOpened] = useGlobalState('searchPopup', false)
  useEffect(() => {
    if ('window' in globalThis) {
      document.body.style.overflowY = isModalOpened ? 'hidden' : 'initial'
    }
  }, [isModalOpened])

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
      setModalOpened(!isModalOpened)
    }
  }

  return (
    isModalOpened && (
      <div
        ref={wrapperRef}
        className={styles.searchWrapper}
        onClick={(e) => clickHandler(e.target)}
      >
        <div className="searchWindow">
          <InstantSearch searchClient={searchClient} indexName={index}>
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
                  <Hit
                    key={hit.objectID}
                    item={hit}
                    page={page}
                    callback={() => setModalOpened(!isModalOpened)}
                  />
                )}
              />
            </Results>
          </InstantSearch>
        </div>
      </div>
    )
  )
}
