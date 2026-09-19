import 'react'

declare namespace JSX {
  interface IntrinsicElements {
    math: Record<string, unknown>
    mrow: Record<string, unknown>
    mi: Record<string, unknown>
    mo: Record<string, unknown>
    mn: Record<string, unknown>
    mfrac: Record<string, unknown>
    mtext: Record<string, unknown>
    msub: Record<string, unknown>
    msup: Record<string, unknown>
    munderover: Record<string, unknown>
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      math: Record<string, unknown>
      mrow: Record<string, unknown>
      mi: Record<string, unknown>
      mo: Record<string, unknown>
      mn: Record<string, unknown>
      mfrac: Record<string, unknown>
      mtext: Record<string, unknown>
      msub: Record<string, unknown>
      msup: Record<string, unknown>
      munderover: Record<string, unknown>
    }
  }
}
