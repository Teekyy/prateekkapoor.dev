import { useEffect, useRef, useState } from 'react'

const EMAIL = 'heyprateekk@gmail.com'

export default function EmailLink() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) setIsCopied(false)
  }, [isOpen])

  async function handleCopy() {
    await navigator.clipboard.writeText(EMAIL)
    setIsCopied(true)
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="font-body text-[13px] 2xl:text-[15px] text-muted tracking-wide bg-transparent border-none p-0 cursor-pointer transition-colors hover:text-accent-deep"
      >
        Email
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-10 w-32 rounded-sm border border-white/10 bg-bg shadow-[0_4px_16px_rgba(0,0,0,0.4)] py-1">
          <button
            type="button"
            onClick={handleCopy}
            className={`block w-full text-left font-mono text-[12px] tracking-wide px-3 py-1.5 bg-transparent border-none cursor-pointer transition-colors ${
              isCopied ? 'text-accent-deep' : 'text-body hover:text-accent'
            }`}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
          <a
            href={`mailto:${EMAIL}`}
            className="block font-mono text-[12px] tracking-wide px-3 py-1.5 text-muted no-underline transition-colors hover:text-accent"
          >
            Send Email
          </a>
        </div>
      )}
    </div>
  )
}
