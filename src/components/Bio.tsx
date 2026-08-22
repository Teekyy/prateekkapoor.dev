const BIO_TEXT = 
"Working in AI to tackle problems that used to be too messy to touch. I like working on things that require depth and feel fulfilling. Ultimately, I want to contribute back to the world more than I take."

export default function Bio() {
  return (
    <p className="font-body text-sm md:text-base 2xl:text-lg leading-relaxed text-body max-w-[480px] 2xl:max-w-[580px] mb-7">
      {BIO_TEXT}
    </p>
  )
}
