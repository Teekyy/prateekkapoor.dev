import { useEffect, useRef, useState } from 'react'
import ConstellationGraph from './ConstellationGraph'

export default function GraphCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const wrapperElement = wrapperRef.current
    if (!wrapperElement) return

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ width: Math.round(width), height: Math.round(height) })
    })
    observer.observe(wrapperElement)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="w-full h-full">
      {size.width > 0 && <ConstellationGraph width={size.width} height={size.height} />}
    </div>
  )
}
