'use client'

import { FormEvent, useState } from 'react'

type Passage = { label: string; available: boolean; content: string; copyright?: string; reason?: string; versionId?: string | number }
type Result = { reference: string; usfm: string; passages: Passage[]; availableVersions?: Array<{ abbreviation: string; title: string; id: number | string }> }

export function BibleFinder() {
  const [reference, setReference] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const response = await fetch(`/api/bible/passage?reference=${encodeURIComponent(reference)}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Pencarian ayat gagal.')
      setResult(data)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Pencarian ayat gagal.')
    } finally {
      setLoading(false)
    }
  }

  return <section className="bible-finder" aria-labelledby="bible-finder-title">
    <div className="bible-finder-head">
      <span className="section-label">Penjelajah Alkitab</span>
      <h2 id="bible-finder-title">Cari ayat, baca lebih dekat.</h2>
      <p>Masukkan nama kitab dan pasal/ayat untuk membandingkan terjemahan yang tersedia.</p>
    </div>
    <form className="bible-finder-form" onSubmit={search}>
      <label htmlFor="bible-reference">Referensi Alkitab</label>
      <div className="bible-finder-row">
        <input id="bible-reference" value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Contoh: Yohanes 3:16 atau Genesis 1:1-3" required />
        <button className="button button-dark" type="submit" disabled={loading}>{loading ? 'Mencari…' : 'Cari ayat'} <span aria-hidden="true">↗</span></button>
      </div>
      <small>Gunakan nama kitab lengkap dalam bahasa Indonesia atau Inggris. Maksimal satu pasal per pencarian.</small>
    </form>
    {error && <p className="bible-finder-message" role="alert">{error}</p>}
    {result && <div className="bible-results" aria-live="polite">
      <div className="bible-results-title"><span className="reflection-kicker">Hasil pencarian</span><h3>{result.reference}</h3></div>
      <div className="bible-results-grid">
        {result.passages.map((passage) => <article className="bible-passage" key={passage.label}>
          <div className="bible-passage-label">{passage.label}</div>
          {passage.available && passage.content ? <p>{passage.content}</p> : <p className="bible-unavailable">{passage.reason || 'Versi ini belum tersedia untuk App Key/lisensi yang aktif.'}</p>}
          {passage.copyright && <small className="bible-copyright">{passage.copyright}</small>}
        </article>)}
      </div>
      <p className="bible-results-note">Teks ditampilkan dari YouVersion sesuai versi dan lisensi yang tersedia untuk aplikasi ini.</p>{result.availableVersions?.length ? <details className="bible-catalog-debug"><summary>Versi dalam katalog yang dapat diakses</summary><p>{result.availableVersions.map((version) => `${version.abbreviation || version.id} — ${version.title}`).join(' · ')}</p></details> : null}
    </div>}
  </section>
}
