interface BioProps {
  text: string
}

export default function Bio({ text }: BioProps) {
  return (
    <p className="font-body text-sm md:text-base leading-relaxed text-body max-w-[480px] mb-7">
      {text}
    </p>
  )
}
