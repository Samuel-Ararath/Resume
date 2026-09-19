import { PageChrome, PageIntro } from '@/components/page-chrome'
const contacts = [
  { label: 'Email', value: 'sycesima@gmail.com', href: 'mailto:sycesima@gmail.com' },
  { label: 'LinkedIn', value: 'Samuel Simanjuntak', href: 'https://www.linkedin.com/in/samuel-simanjuntak-b9b98b2b0' },
  { label: 'GitHub', value: 'Samuel-Ararath', href: 'https://github.com/Samuel-Ararath' },
  { label: 'Discord', value: 'ryazanvl', href: 'https://discord.com/users/ryazanvl' },
]

export default function ContactPage() { return <PageChrome><main className="contact-page"><PageIntro label="Contact" title={<>Some ideas are better <em>shared.</em></>} description="Whether it is a project, a question, an opportunity to collaborate, or simply an interesting thought worth discussing, you are welcome to reach out." /><section className="section-shell page-section contact-detail"><div className="contact-copy"><p>I may not always have the answer, but I am always interested in a conversation that leads somewhere.</p><h2>Get in touch</h2></div><div className="contact-directory">{contacts.map((contact) => <a className="contact-directory-item" key={contact.label} href={contact.href} target={contact.label === 'Email' ? undefined : '_blank'} rel={contact.label === 'Email' ? undefined : 'noreferrer'}><span>{contact.label}</span><strong>{contact.value}</strong><span aria-hidden="true">↗</span></a>)}</div></section></main></PageChrome> }
