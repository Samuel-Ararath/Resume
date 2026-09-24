import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const API_BASE = 'https://api.youversion.com/v1'
const BOOKS: Array<[string, string[]]> = [
  ['GEN', ['kejadian', 'genesis', 'gen']], ['EXO', ['keluaran', 'exodus', 'exo']], ['LEV', ['imamat', 'leviticus', 'lev']], ['NUM', ['bilangan', 'numbers', 'num']], ['DEU', ['ulangan', 'deuteronomy', 'deu']],
  ['JOS', ['yosua', 'joshua', 'jos']], ['JDG', ['hakim-hakim', 'hakim', 'judges', 'jdg']], ['RUT', ['rut', 'ruth']], ['1SA', ['1 samuel', '1samuel', '1 sam']], ['2SA', ['2 samuel', '2samuel', '2 sam']],
  ['1KI', ['1 raja-raja', '1raja-raja', '1 raja', '1 kings']], ['2KI', ['2 raja-raja', '2raja-raja', '2 raja', '2 kings']], ['1CH', ['1 tawarikh', '1tawarikh', '1 chronicles']], ['2CH', ['2 tawarikh', '2tawarikh', '2 chronicles']], ['EZR', ['ezra']],
  ['NEH', ['nehemia', 'nehemiah']], ['EST', ['ester', 'esther']], ['JOB', ['ayub', 'job']], ['PSA', ['mazmur', 'psalm', 'psalms', 'psa']], ['PRO', ['amsal', 'proverbs', 'prov']],
  ['ECC', ['pengkhotbah', 'ecclesiastes', 'ecc']], ['SNG', ['kidung agung', 'kidung', 'song of solomon', 'song of songs']], ['ISA', ['yesaya', 'isaiah']], ['JER', ['yeremia', 'jeremiah']], ['LAM', ['ratapan', 'lamentations']],
  ['EZK', ['yehezkiel', 'yehezkiel', 'ezekiel']], ['DAN', ['daniel']], ['HOS', ['hosea']], ['JOL', ['yoel', 'joel']], ['AMO', ['amos']],
  ['OBA', ['obaja', 'obadiah']], ['JON', ['yunus', 'jonah']], ['MIC', ['mikha', 'micah']], ['NAM', ['nahum']], ['HAB', ['habakuk', 'habakkuk']],
  ['ZEP', ['zefanya', 'zephaniah']], ['HAG', ['hagai', 'haggai']], ['ZEC', ['zakharia', 'zechariah']], ['MAL', ['maleakhi', 'malachi']], ['MAT', ['matius', 'matthew', 'mat']],
  ['MRK', ['markus', 'mark']], ['LUK', ['lukas', 'luke']], ['JHN', ['yohanes', 'john', 'jhn']], ['ACT', ['kisah para rasul', 'kisah rasul', 'acts']], ['ROM', ['roma', 'romans']],
  ['1CO', ['1 korintus', '1korintus', '1 corinthians']], ['2CO', ['2 korintus', '2korintus', '2 corinthians']], ['GAL', ['galatia', 'galatians']], ['EPH', ['efesus', 'ephesians']], ['PHP', ['filipi', 'philippians']],
  ['COL', ['kolose', 'colossians']], ['1TH', ['1 tesalonika', '1tesalonika', '1 thessalonians']], ['2TH', ['2 tesalonika', '2tesalonika', '2 thessalonians']], ['1TI', ['1 timotius', '1timotius', '1 timothy']], ['2TI', ['2 timotius', '2timotius', '2 timothy']],
  ['TIT', ['titus']], ['PHM', ['filemon', 'philemon']], ['HEB', ['ibrani', 'hebrews']], ['JAS', ['yakobus', 'james']], ['1PE', ['1 petrus', '1petrus', '1 peter']],
  ['2PE', ['2 petrus', '2petrus', '2 peter']], ['1JN', ['1 yohanes', '1yohanes', '1 john']], ['2JN', ['2 yohanes', '2yohanes', '2 john']], ['3JN', ['3 yohanes', '3yohanes', '3 john']], ['JUD', ['yudas', 'jude']], ['REV', ['wahyu', 'revelation', 'rev']],
]

class YouVersionApiError extends Error {
  constructor(public status: number, public endpoint: string) {
    super(`YouVersion API returned ${status} for ${endpoint}`)
    this.name = 'YouVersionApiError'
  }
}

type BibleVersion = {
  id: number | string
  abbreviation?: string
  name?: string
  title?: string
  name_local?: string
  language?: { id?: string; name?: string; name_local?: string; iso_639_1?: string; iso_639_3?: string }
  language_id?: string
  language_code?: string
  [key: string]: unknown
}

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.'’]/g, '').replace(/\s+/g, ' ').trim()
}

function toUsfm(input: string) {
  const value = input.trim()
  const usfm = value.match(/^([1-3]?[A-Za-z]{2,3})[ .](\d{1,3})(?:[.:](\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?)?$/)
  if (usfm) {
    const book = usfm[1].toUpperCase().replace(/^([1-3])([A-Z])/, '$1$2')
    const code = book.length === 3 ? book : book.padEnd(3, 'X')
    return `${code}.${usfm[2]}${usfm[3] ? `.${usfm[3]}${usfm[4] ? `-${usfm[4]}` : ''}` : ''}`
  }
  const match = value.match(/^(.+?)\s+(\d{1,3})(?::(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?)?$/)
  if (!match) return null
  const bookName = normalize(match[1])
  const book = BOOKS.find(([, names]) => names.some((name) => normalize(name) === bookName))
  if (!book) return null
  return `${book[0]}.${match[2]}${match[3] ? `.${match[3]}${match[4] ? `-${match[4]}` : ''}` : ''}`
}

function rowsFrom(payload: unknown): BibleVersion[] {
  if (Array.isArray(payload)) return payload as BibleVersion[]
  if (!payload || typeof payload !== 'object') return []
  const data = (payload as { data?: unknown; bibles?: unknown; items?: unknown }).data ?? (payload as { bibles?: unknown }).bibles ?? (payload as { items?: unknown }).items
  return Array.isArray(data) ? data as BibleVersion[] : []
}

function textOf(version: BibleVersion) {
  return [version.abbreviation, version.name, version.title, version.name_local, version.language?.id, version.language?.name, version.language?.name_local, version.language?.iso_639_1, version.language?.iso_639_3, version.language_id, version.language_code]
    .filter((part) => typeof part === 'string').join(' ').toLowerCase()
}

function cleanContent(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.replace(/<br\s*\/?\s*>/gi, '\n').replace(/<\/(p|div|li|h[1-6])\s*>/gi, '\n').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/[\t ]+\n/g, '\n').trim()
}

async function apiGet(path: string, appKey: string) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'X-YVP-App-Key': appKey, Accept: 'application/json' },
    next: { revalidate: 3600 },
  })
  if (!response.ok) throw new YouVersionApiError(response.status, path.split('?')[0])
  return response.json()
}

export async function GET(request: Request) {
  const appKey = process.env.YVP_APP_KEY
  if (!appKey) return NextResponse.json({ error: 'Pencarian Alkitab belum dikonfigurasi. Tambahkan YVP_APP_KEY di environment hosting.' }, { status: 503 })

  const { searchParams } = new URL(request.url)
  const rawReference = searchParams.get('reference') ?? ''
  const usfm = toUsfm(rawReference)
  if (!usfm) return NextResponse.json({ error: 'Masukkan referensi seperti “Yohanes 3:16”, “Kejadian 1:1-3”, atau “JHN.3.16”.' }, { status: 400 })

  try {
    const versionData = await apiGet('/bibles?language_ranges%5B%5D=ind&language_ranges%5B%5D=eng&language_ranges%5B%5D=heb&language_ranges%5B%5D=grc', appKey)
    const versions = rowsFrom(versionData)
    if (!versions.length) return NextResponse.json({ error: 'Daftar versi Alkitab tidak tersedia untuk App Key ini. Periksa lisensi dan akses Bible collection di YouVersion.' }, { status: 403 })

    const find = (abbreviations: string[]) => versions.find((version) => abbreviations.includes((version.abbreviation ?? '').toUpperCase()))
    const selected: Array<{ label: string; version?: BibleVersion }> = [
      { label: 'TB · Bahasa Indonesia', version: find(['TB']) },
      { label: 'ILT · Indonesian Literal Translation', version: find(['ILT']) },
      { label: 'NIV · English', version: find(['NIV']) },
      { label: 'KJV · English', version: find(['KJV']) },
    ]
    const isOldTestament = !['MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV'].includes(usfm.slice(0, 3))
    const originalCandidates = versions.filter((version) => {
      const info = textOf(version)
      return /original|masoretic|hebrew old testament|greek new testament|sbl greek|textus receptus|westcott|nestle|\bwlc\b|\bbhs\b|\buhb\b|\bsblgnt\b/.test(info)
    })
    const original = originalCandidates.find((version) => {
      const info = textOf(version)
      return isOldTestament ? /hebrew|masoretic|wlc|bhs|uhb/.test(info) : /greek|sblgnt|textus receptus|nestle|westcott/.test(info)
    })
    selected.push({ label: isOldTestament ? 'Bahasa asli · Ibrani' : 'Bahasa asli · Yunani', version: original })

    const passages = await Promise.all(selected.map(async ({ label, version }) => {
      if (!version) return { label, available: false, content: '' }
      try {
        const payload = await apiGet(`/bibles/${encodeURIComponent(String(version.id))}/passages/${encodeURIComponent(usfm)}?format=text`, appKey)
        const data = (payload as { data?: Record<string, unknown> }).data ?? payload as Record<string, unknown>
        const content = cleanContent(data.content ?? data.text)
        const copyright = typeof data.copyright === 'string' ? data.copyright : typeof data.copyright_short === 'string' ? data.copyright_short : ''
        return { label, available: Boolean(content), content, copyright, versionId: version.id }
      } catch {
        return { label, available: false, content: '' }
      }
    }))

    return NextResponse.json({ reference: rawReference, usfm, isOldTestament, passages })
  } catch (error) {
    if (error instanceof YouVersionApiError) {
      console.error('[bible-finder] YouVersion request failed', { status: error.status, endpoint: error.endpoint })
      const detail = error.status === 401
        ? 'YouVersion menolak App Key. Periksa bahwa YVP_APP_KEY berisi App Key dari aplikasi yang aktif.'
        : error.status === 403
          ? 'Aplikasi belum memiliki izin/lisensi untuk mengakses Bible collection ini.'
          : error.status === 404
            ? 'Endpoint atau referensi ayat tidak ditemukan di YouVersion.'
            : error.status === 429
              ? 'Batas permintaan YouVersion tercapai. Coba lagi sebentar.'
              : `YouVersion mengembalikan HTTP ${error.status}.`
      return NextResponse.json({ error: `${detail} (${error.endpoint})` }, { status: 502 })
    }
    console.error('[bible-finder] Unexpected request error', error)
    return NextResponse.json({ error: 'Tidak dapat terhubung ke YouVersion. Coba lagi sebentar.' }, { status: 502 })
  }
}
