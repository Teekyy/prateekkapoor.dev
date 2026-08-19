interface NameHeadingProps {
  name: string
  title: string
  tag: string
}

export default function NameHeading({ name, title, tag }: NameHeadingProps) {
  return (
    <div className="mb-4">
      <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-heading">
        {name}
      </h1>
      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="font-display font-medium text-lg md:text-xl tracking-tight text-body">
          {title}
        </span>
        <span className="font-mono text-[11px] tracking-wide text-accent opacity-90">
          {'// '}{tag}
        </span>
      </div>
    </div>
  )
}
