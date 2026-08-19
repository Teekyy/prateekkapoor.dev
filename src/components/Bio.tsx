const BIO_TEXT = 
"Full-stack engineer who ended up in applied AI, mostly because I like turning messy, unstructured things into something a machine can actually reason about. I'm increasingly curious about how to build systems that stay useful when the ground shifts under them."

export default function Bio() {
  return (
    <p className="font-body text-sm md:text-base leading-relaxed text-body max-w-[480px] mb-7">
      {BIO_TEXT}
    </p>
  )
}
