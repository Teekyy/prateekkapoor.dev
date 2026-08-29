import NameHeading from './components/NameHeading'
import Bio from './components/Bio'
import CurrentlyLine from './components/CurrentlyLine'
import LinksList from './components/LinksList'
import GraphCanvas from './components/GraphCanvas'
import NoiseOverlay from './components/NoiseOverlay'

export default function App() {
  return (
    <div className="relative min-h-dvh w-full bg-bg text-heading">
      <NoiseOverlay />
      <div className="absolute top-0 right-0 z-10 h-dvh w-[54vw]">
        <GraphCanvas />
      </div>

      <div className="relative z-20 flex h-dvh items-center pointer-events-none p-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:p-16">
        <div className="pointer-events-auto w-full max-w-[520px] 2xl:max-w-[640px]">
          <NameHeading name="Prateek Kapoor" title="Software Engineer" tag="Applied AI" />

          <div className="mb-7 h-px w-8 bg-white/10" />

          <Bio />
          <CurrentlyLine />
          <LinksList />
        </div>
      </div>
    </div>
  )
}
