import { useState } from 'react'

const EMAIL = 'hello@example.com' // placeholder — swap for your real contact email

export default function CopyEmailLink() {
  const [copied, setCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className="font-body text-[13px] text-muted tracking-wide transition-colors hover:text-accent-deep cursor-pointer"
    >
      {copied ? 'Copied!' : 'Email'}
    </button>
  )
}
