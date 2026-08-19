import NameHeading from './components/NameHeading'
import Bio from './components/Bio'
import CurrentlyLine from './components/CurrentlyLine'
import LinksList from './components/LinksList'
import GraphCanvas from './components/GraphCanvas'
import NoiseOverlay from './components/NoiseOverlay'

const BIO_TEXT =
  "Full-stack engineer who ended up in applied AI, mostly because I like turning messy, unstructured things into something a machine can actually reason about. I'm increasingly curious about how to build systems that stay useful when the ground shifts under them."

const CURRENTLY_TEXT =
  'Shipping applied AI in production, chipping away at an MS in Computer Science at Georgia Tech.'

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg text-heading">
      <NoiseOverlay />
      <div className="fixed top-0 right-0 z-10 h-screen w-[54vw]">
        <GraphCanvas />
      </div>

      <div className="relative z-20 flex min-h-screen items-end pointer-events-none p-10 pb-14 md:p-16 md:pb-24">
        <div className="pointer-events-auto w-full max-w-[520px]">
          <NameHeading name="Prateek Kapoor" title="Software Engineer" tag="Applied AI" />

          <div className="mb-7 h-px w-8 bg-white/10" />

          <Bio text={BIO_TEXT} />
          <CurrentlyLine text={CURRENTLY_TEXT} />
          <LinksList />
        </div>
      </div>
    </div>
  )
}
