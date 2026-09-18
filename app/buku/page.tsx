import { PageChrome, PageIntro } from '@/components/page-chrome'
import { books } from '@/lib/content'

export default function BooksPage() { return <PageChrome><main><PageIntro label="Bookshelf" title={<>Books I keep <em>coming back to.</em></>} description="A quiet shelf for ideas that made Samuel pause, question, or see the familiar differently." /><section className="section-shell page-section"><div className="card-list">{books.map((book, index) => <article className="editorial-card" key={book.title}><span className="card-number">0{index + 1}</span><div><p className="card-meta">{book.category}</p><h3>{book.title}</h3><p>{book.author} · {book.note}</p></div><span className="card-arrow" aria-hidden="true">↗</span></article>)}</div></section></main></PageChrome> }
