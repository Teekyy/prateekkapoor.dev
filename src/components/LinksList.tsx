import EmailLink from './EmailLink'

interface Link {
  label: string
  href: string
  newTab?: boolean
}

const LINKS: Link[] = [
  { label: 'GitHub', href: 'https://github.com/Teekyy', newTab: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prateekkapoor3/', newTab: true },
  { label: 'Resume', href: '/Prateek Kapoor - Resume.pdf', newTab: true },
]

export default function LinksList() {
  return (
    <nav aria-label="Contact links">
      <ul className="list-none m-0 p-0 flex items-center flex-wrap">
        <li className="flex items-center">
          <EmailLink />
        </li>
        {LINKS.map((link) => (
          <li key={link.label} className="flex items-center">
            <span className="inline-block w-px h-[11px] bg-white/15 mx-3.5 shrink-0" />
            <a
              href={link.href}
              {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
