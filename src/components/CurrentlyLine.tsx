const CURRENTLY_TEXT =
  'Shipping applied AI in production, chipping away at an MS in Computer Science at Georgia Tech.'

export default function CurrentlyLine() {
  return (
    <div className="font-mono text-xs text-muted tracking-wide mb-9 leading-relaxed">
      <span className="text-accent mr-2">▸</span>
      <span className="text-muted/80">currently</span>
      <span className="text-white/10 mx-2">|</span>
      {CURRENTLY_TEXT}
    </div>
  )
}
