export type Book = { title: string; author: string; note: string; category: string }
export type Film = { title: string; type: string; year: string; status: string }
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
  { title: 'Daftar film akan segera hadir', type: 'Film / Series', year: '—', status: 'From Notion' },
  { title: 'Kurasi tontonan personal', type: 'Anime / TV / Film', year: '—', status: 'Coming soon' },
  { title: 'Catatan setelah menonton', type: 'Personal notes', year: '—', status: 'Coming soon' },
]

export const reflections: Reflection[] = [
  { number: '01', title: 'Ruang untuk berpikir lebih jernih', excerpt: 'Renungan dan tulisan pendek akan hadir di sini—sebagai jeda kecil dari ritme yang terlalu cepat.', theme: 'Coming soon' },
  { number: '02', title: 'Yang bertumbuh dalam diam', excerpt: 'Kumpulan catatan personal tentang iman, kerja, proses, dan hal-hal yang sering luput diperhatikan.', theme: 'Coming soon' },
]

export const principles = ['Curiosity over certainty', 'Depth over noise', 'Consistency over urgency']
