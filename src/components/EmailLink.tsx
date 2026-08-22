const EMAIL = 'heyprateekk@gmail.com'

export default function EmailLink() {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className="font-body text-[13px] text-muted tracking-wide no-underline transition-colors hover:text-accent-deep"
    >
      Email
    </a>
  )
}
