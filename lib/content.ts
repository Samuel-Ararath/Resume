export type Book = { title: string; author: string; note: string; category: string }
export type Film = { title: string; type: 'Anime' | 'TV Series' | 'Film'; rating: string; watchStatus: 'Sudah selesai' | 'Belum nonton' | 'Sedang nonton'; genres: string[]; progress: string; malRating: string; generalRating?: string; poster?: string; source?: string }
export type Reflection = { number: string; title: string; excerpt: string; theme: string }
export type Experience = { company: string; role: string; period: string; location: string; description: string }

export const linkedinUrl = 'https://www.linkedin.com/in/samuel-simanjuntak-b9b98b2b0/'
export const notionFilmsUrl = 'https://app.notion.com/p/Anime-TV-Series-Film-2f176e13d86f8063bf59d0234d318095?source=copy_link'

export const experiences: Experience[] = [
  { company: 'Lembaga Alkitab Indonesia', role: 'Production Planning Control', period: 'July 2026 – August 2026', location: 'Cibinong', description: 'Engaged directly on the shop floor to identify bottlenecks across the production line, analyze machinery performance using OEE, perform Life Cycle Cost analysis, and develop proposals to improve reliability and reduce downtime.' },
  { company: 'Persekutuan Mahasiswa Kristen Institut Teknologi Sumatera', role: 'Head of Operations', period: 'February 2025 – February 2026', location: 'Lampung, Indonesia', description: 'Led the Logistics and Accommodation divisions, coordinating operational planning, transportation, safety standards, cross-division execution, budget efficiency, risk mitigation, SOPs, and post-event evaluation.' },
  { company: 'Persekutuan Mahasiswa Kristen Institut Teknologi Sumatera', role: 'Head of Logistics Division', period: 'February 2024 – February 2025', location: 'Lampung, Indonesia', description: 'Planned, procured, managed, and distributed operational supplies while coordinating vendors, inventory, budgets, and technical execution with other divisions.' },
  { company: 'Persekutuan Mahasiswa Kristen Institut Teknologi Sumatera', role: 'Accommodation Staff', period: 'February 2023 – February 2024', location: 'Lampung, Indonesia', description: 'Supported transportation, equipment distribution, and technical readiness across organizational activities in close coordination with the wider team.' },
  { company: 'Batavia ITERA', role: 'Head of Inventory Division', period: 'January 2025 – January 2026', location: 'Lampung, Indonesia', description: 'Managed organizational assets and inventory through structured records, usage controls, maintenance planning, and needs-based procurement evaluation.' },
]

export const education = [
  { institution: 'Institut Teknologi Sumatera', program: 'Bachelor of Engineering, Industrial Engineering', period: '2022' },
  { institution: 'SMA N 10 JAKARTA', program: 'Natural Sciences', period: 'July 2020 – May 2022' },
]

export const skills = ['Preventive Maintenance', 'Life Cycle Cost Analysis', 'Asset Control & Monitoring']
export const honors = ['Top 10 Finalist: Investment Competition EFFECT UNS 2024']

export const books: Book[] = [
  { title: 'Pilihan buku akan segera hadir', author: 'Daftar pribadi Samuel', note: 'Koleksi bacaan dan catatan personal akan ditambahkan setelah data final tersedia.', category: 'Curated list' },
  { title: 'Sebuah ruang untuk ide', author: 'Catatan membaca', note: 'Setiap judul akan hadir dengan alasan mengapa buku itu layak dibaca.', category: 'Reading notes' },
  { title: 'Membaca dengan perlahan', author: 'Prinsip kurasi', note: 'Buku yang tinggal lebih lama di kepala, bukan hanya yang selesai lebih cepat.', category: 'Perspective' },
]

export const films: Film[] = [
  { title: '2.5-jigen no Ririsa', type: 'Anime', rating: '⭐️⭐️⭐️', watchStatus: 'Belum nonton', genres: ['Comedy', 'Ecchi', 'Harem', 'School', 'Shounen'], progress: 'Tamat · 12 eps', malRating: '6.6' },
  { title: '3D Kanojo: Real Girl', type: 'Anime', rating: '⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Romance', 'School', 'Shoujo'], progress: 'Tamat · 24 eps', malRating: '7.1' },
  { title: '5-toubun no Hanayome', type: 'Anime', rating: '⭐️⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Comedy', 'Harem', 'Romance', 'School', 'Shounen'], progress: 'Tamat · 24 eps', malRating: '7.6' },
  { title: '86 (Eighty Six)', type: 'Anime', rating: '⭐️⭐️⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Drama', 'Mecha', 'Sci-Fi'], progress: 'Tamat · 23 eps', malRating: '8.4' },
  { title: 'Absolute Duo', type: 'Anime', rating: '⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Ecchi', 'Harem', 'Romance', 'School', 'Supernatural'], progress: 'Tamat · 12 eps', malRating: '6.6' },
  { title: 'Accel World', type: 'Anime', rating: '⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Game', 'Isekai', 'Romance', 'School', 'Sci-Fi', 'Shounen'], progress: 'Tamat · 24 eps', malRating: '7.1' },
  { title: 'Ahiru no Sora', type: 'Anime', rating: '⭐️', watchStatus: 'Sudah selesai', genres: ['Comedy', 'Drama', 'School', 'Shounen', 'Sports'], progress: 'Tamat · 50 eps', malRating: '6.9' },
  { title: 'Akagami no Shirayuki-hime', type: 'Anime', rating: '⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Drama', 'Fantasy', 'Historical', 'Romance', 'Shoujo'], progress: 'Tamat · 24 eps', malRating: '7.9' },
  { title: 'Akame ga Kill', type: 'Anime', rating: '⭐️⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Shounen'], progress: 'Tamat · 24 eps', malRating: '7.5' },
  { title: 'Akatsuki no Yona', type: 'Anime', rating: '⭐️⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Comedy', 'Fantasy', 'Romance', 'Shoujo'], progress: 'Tamat · 24 eps', malRating: '8.0' },
  { title: 'Aldnoah Zero', type: 'Anime', rating: '⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Mecha', 'Sci-Fi'], progress: 'Tamat · 24 eps', malRating: '7.0' },
  { title: 'Amagami SS', type: 'Anime', rating: '⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Comedy', 'Romance', 'School', 'Slice of Life'], progress: 'Tamat · 24 eps', malRating: '7.2' },
  { title: 'Amagi Brilliant Park', type: 'Anime', rating: '⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Comedy', 'Drama', 'Fantasy', 'Magic'], progress: 'Tamat · 13 eps', malRating: '7.1' },
  { title: 'Angel Beats!', type: 'Anime', rating: '⭐️⭐️⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Comedy', 'Drama', 'School', 'Supernatural'], progress: 'Tamat · 13 eps', malRating: '8.0' },
  { title: 'Ao Ashi', type: 'Anime', rating: '⭐️⭐️', watchStatus: 'Belum nonton', genres: ['Seinen', 'Sports'], progress: 'Tamat · 24 eps', malRating: '7.7' },
  { title: 'Ao no Exorcist', type: 'Anime', rating: '⭐️⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Demon', 'Fantasy', 'Shounen', 'Supernatural'], progress: 'Tamat · 73 eps', malRating: '7.5' },
  { title: 'Arifureta Shokugyou de Sekai Saikyou', type: 'Anime', rating: '⭐️⭐️⭐️', watchStatus: 'Sudah selesai', genres: ['Action', 'Adventure', 'Fantasy', 'Harem', 'Isekai'], progress: 'Ongoing · 37 eps', malRating: '7.1' },
]

export const reflections: Reflection[] = [
  { number: '01', title: 'Ruang untuk berpikir lebih jernih', excerpt: 'Renungan dan tulisan pendek akan hadir di sini—sebagai jeda kecil dari ritme yang terlalu cepat.', theme: 'Coming soon' },
  { number: '02', title: 'Yang bertumbuh dalam diam', excerpt: 'Kumpulan catatan personal tentang iman, kerja, proses, dan hal-hal yang sering luput diperhatikan.', theme: 'Coming soon' },
]

export const principles = ['Curiosity over certainty', 'Depth over noise', 'Consistency over urgency']
