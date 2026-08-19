import CopyEmailLink from './CopyEmailLink'

interface Link {
  label: string
  href: string
}

const LINKS: Link[] = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Resume', href: '#' },
]

export default function LinksList() {
  return (
    <nav aria-label="Contact links">
      <ul className="list-none m-0 p-0 flex items-center flex-wrap">
        <li className="flex items-center">
          <CopyEmailLink />
        </li>
        {LINKS.map((link) => (
          <li key={link.label} className="flex items-center">
            <span className="inline-block w-px h-[11px] bg-white/15 mx-3.5 shrink-0" />
            <a
              href={link.href}
              className="font-body text-[13px] text-muted tracking-wide no-underline transition-colors hover:text-accent-deep"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
