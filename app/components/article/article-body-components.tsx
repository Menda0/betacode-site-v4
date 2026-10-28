import { Children, isValidElement, type ComponentProps, type ReactNode } from 'react'
import type { MDXComponents } from 'mdx/types'

function Paragraph(props: ComponentProps<'p'>) {
  return <p>{props.children}</p>
}

/** MDX wraps text inside block elements in `<p>`; the prototype puts the text directly in the block. */
function unwrapParagraphs(children: ReactNode) {
  return Children.map(children, (child) =>
    isValidElement<{ children?: ReactNode }>(child) && (child.type === Paragraph || child.type === 'p')
      ? child.props.children
      : child
  )
}

function Heading({ id, children, ...rest }: ComponentProps<'h2'> & { 'data-n'?: string }) {
  return (
    <h2 id={id}>
      <span className="mono" aria-hidden="true" style={{ color: '#EB5648', fontSize: 18, fontWeight: 700, marginRight: 10 }}>
        {rest['data-n']}
      </span>
      {children}
    </h2>
  )
}

function Blockquote({ children }: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      style={{
        margin: '8px 0',
        padding: '4px 0 4px 24px',
        borderLeft: '4px solid #EB5648',
        fontFamily: 'var(--font-montserrat), sans-serif',
        fontSize: 24,
        lineHeight: 1.35,
        fontWeight: 700,
        letterSpacing: '-0.01em',
      }}
    >
      {unwrapParagraphs(children)}
    </blockquote>
  )
}

// TODO(betacode): the Note in "A era agêntica do software" about the Coach ID assistant's next step (full training plans approved by the coach) must be confirmed or removed in the content file.
function Note({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 18, padding: '20px 22px', display: 'flex', gap: 14, fontSize: 16, lineHeight: 1.6 }}>
      <span className="mono" aria-hidden="true" style={{ color: '#EB5648', fontWeight: 700, fontSize: 16 }}>
        {'//'}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <strong style={{ fontSize: 15 }}>{title}</strong>
        <span style={{ color: 'var(--muted)' }}>{unwrapParagraphs(children)}</span>
      </span>
    </div>
  )
}

export const articleBodyComponents: MDXComponents = {
  h2: Heading,
  p: Paragraph,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  blockquote: Blockquote,
  Note,
}
