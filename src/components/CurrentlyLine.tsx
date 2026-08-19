interface CurrentlyLineProps {
  text: string
}

export default function CurrentlyLine({ text }: CurrentlyLineProps) {
  return (
    <div className="font-mono text-xs text-muted tracking-wide mb-9 leading-relaxed">
      <span className="text-accent mr-2">▸</span>
      <span className="text-muted/80">currently</span>
      <span className="text-white/10 mx-2">|</span>
      {text}
    </div>
  )
}
