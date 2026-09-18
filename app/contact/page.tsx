import { PageChrome, PageIntro } from '@/components/page-chrome'
import { linkedinUrl } from '@/lib/content'

export default function ContactPage() { return <PageChrome><main><PageIntro label="Contact" title={<>Have something <em>in mind?</em></>} description="For thoughtful collaborations, conversations, or a good book recommendation." /><section className="section-shell page-section contact-detail"><a className="email-link" href="mailto:hello@samuel.space">hello@samuel.space <span aria-hidden="true">↗</span></a><div className="contact-links"><a className="text-link" href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><span className="quiet-note">Jakarta / Indonesia</span></div></section></main></PageChrome> }
