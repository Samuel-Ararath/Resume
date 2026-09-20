import type { ReactNode } from 'react'

type ReflectionReaderProps = { body: string }

function cleanInline(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(?:p|toggle|quote|callout)(?:\s[^>]*)?>/gi, '')
    .replace(/<\/?(?:i|b|u|s)>/gi, '')
    .replace(/<span[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/^>\s?/gm, '')
    .trim()
}

function isQuote(value: string) {
  const trimmed = value.trim()
  return trimmed.startsWith('>') || (/<i>/i.test(trimmed) && /(?:color="blue"|<toggle|<quote)/i.test(trimmed))
}

function renderBlock(raw: string, index: number): ReactNode {
  const block = raw.trim()
  if (!block) return null
  const content = cleanInline(block)
  if (!content) return null
  if (isQuote(block)) return <blockquote key={index} className="reflection-scripture"><p>{content}</p></blockquote>
  if (/^###\s+/.test(content)) return <h3 key={index}>{content.replace(/^###\s+/, '')}</h3>
  if (/^##\s+/.test(content)) return <h2 key={index}>{content.replace(/^##\s+/, '')}</h2>
  if (/^#\s+/.test(content)) return <h2 key={index}>{content.replace(/^#\s+/, '')}</h2>
  return <p key={index}>{content}</p>
}

export function ReflectionReader({ body }: ReflectionReaderProps) {
  const blocks = body.replace(/\r\n/g, '\n').split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean)
  return <div className="reflection-reader">{blocks.map(renderBlock)}</div>
}
