export type Book = { title: string; author: string; note: string; category: string }
export type Film = { title: string; type: string; year: string; status: string }
export type Reflection = { number: string; title: string; excerpt: string; theme: string }

export const books: Book[] = [
  { title: 'Pilihan buku akan segera hadir', author: 'Daftar pribadi Samuel', note: 'Koleksi bacaan dan catatan personal akan ditambahkan setelah data final tersedia.', category: 'Curated list' },
  { title: 'Sebuah ruang untuk ide', author: 'Catatan membaca', note: 'Setiap judul akan hadir dengan alasan mengapa buku itu layak dibaca.', category: 'Reading notes' },
  { title: 'Membaca dengan perlahan', author: 'Prinsip kurasi', note: 'Buku yang tinggal lebih lama di kepala, bukan hanya yang selesai lebih cepat.', category: 'Perspective' },
]

export const films: Film[] = [
  { title: 'Daftar film akan segera hadir', type: 'Film / Series', year: '—', status: 'From Notion' },
  { title: 'Kurasi tontonan personal', type: 'Anime / TV / Film', year: '—', status: 'Coming soon' },
  { title: 'Catatan setelah menonton', type: 'Personal notes', year: '—', status: 'Coming soon' },
]

export const reflections: Reflection[] = [
  { number: '01', title: 'Ruang untuk berpikir lebih jernih', excerpt: 'Renungan dan tulisan pendek akan hadir di sini—sebagai jeda kecil dari ritme yang terlalu cepat.', theme: 'Coming soon' },
  { number: '02', title: 'Yang bertumbuh dalam diam', excerpt: 'Kumpulan catatan personal tentang iman, kerja, proses, dan hal-hal yang sering luput diperhatikan.', theme: 'Coming soon' },
]

export const principles = ['Curiosity over certainty', 'Depth over noise', 'Consistency over urgency']
