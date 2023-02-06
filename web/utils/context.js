import { createContext, useContext, useState } from 'react'

const ArticleIdContext = createContext(undefined)

export function AppWrapper({ children }) {
  const [articleId, setArticleId] = useState('')
  let sharedState = {
    id: articleId,
    setId: (id) => setArticleId(id),
  }

  return <ArticleIdContext.Provider value={sharedState}>{children}</ArticleIdContext.Provider>
}

export function useAppContext() {
  return useContext(ArticleIdContext)
}
