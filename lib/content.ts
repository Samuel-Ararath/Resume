export type Book = { title: string; author: string; note: string; category: string }
export type Film = { title: string; type: 'Anime' | 'TV Series' | 'Film'; rating: string; watchStatus: 'Sudah selesai' | 'Belum nonton' | 'Sedang nonton'; genres: string[]; progress: string; malRating: string; generalRating?: string; poster?: string; source?: string }
export type Reflection = { number: string; title: string; excerpt: string; theme: string }
export type Experience = { company: string; role: string; period: string; location: string; description: string }

export const linkedinUrl = 'https://www.linkedin.com/in/samuel-simanjuntak-b9b98b2b0/'


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

export const books: Book[] = []

export const films: Film[] = []

export const reflections: Reflection[] = []

export const principles = ['Curiosity over certainty', 'Depth over noise', 'Consistency over urgency']
