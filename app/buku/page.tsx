import { PageChrome, PageIntro } from '@/components/page-chrome'
import { Bookshelf } from '@/components/bookshelf'
import { getNotionBooks } from '@/lib/notion-books'

export default async function BooksPage() {
  const books = await getNotionBooks()
  return <PageChrome><main><PageIntro label="Bookshelf" title={<>Books I keep <em>coming back to.</em></>} description="A living shelf of books, novels, manga, manhua, and manhwa — synced from Samuel's private reading archive." /><Bookshelf books={books} /></main></PageChrome>
}
