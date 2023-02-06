import { searchClient } from '~/utils/algolia-client'
import Hit from '~/sections/Search/Hit'
import SVG from '~/components/SVG'
import { sentimentNeutralIcon } from '~/utils/svgImages'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  connectStateResults,
} from 'react-instantsearch-dom'

import styles from './style.module.scss'

export const Search = ({ handler }) => {
  const Results = connectStateResults(({ searchState, searchResults, children }) =>
    searchState.query ? (
      searchResults && searchResults.nbHits !== 0 ? (
        <>
          {children}
          {searchResults.nbPages > 1 && <Pagination />}
        </>
      ) : (
        <div className="ais-Hits">
          <div className="ais-Hits-list">
            <p className="flex align-center bold color-darkgray pt-2x pb-2x">
              <SVG content={sentimentNeutralIcon('#F94144')} size={24} className={'mr-2x'} />
              Sorry, no results found
            </p>
          </div>
        </div>
      )
    ) : null
  )

  return (
    <div className={`${styles.wrapper} relative pseudo_before pseudo_after_circle_blue`}>
      <InstantSearch searchClient={searchClient} indexName="articles">
        <SearchBox
          translations={{
            placeholder: 'Start your search here…',
          }}
        />
        <Results>
          <Hits
            hitComponent={({ hit }) => (
              <Hit key={hit.objectID} item={hit} callback={() => handler(hit)} />
            )}
          />
        </Results>
      </InstantSearch>
    </div>
  )
}
