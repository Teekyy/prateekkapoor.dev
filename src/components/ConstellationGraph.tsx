import { useEffect, useRef } from 'react'
const REFERENCE_NODE_DENSITY = 64 / (778 * 900)
const MIN_NODE_COUNT = 64
const MAX_NODE_COUNT = 280
const LINK_DISTANCE_FACTOR = 1.05 // multiple of avg node spacing a link can span
const MIN_LINK_DISTANCE = 110 // px floor so small/narrow panels stay as connected as before
const MOUSE_DISTANCE = 140
const LEFT_FADE_ZONE = 90 // px past the left edge over which nodes fade out
const PULSE_INTERVAL_MS = 2000 // time between idle edge pulses
const PULSE_DURATION_MS = 1600 // how long one pulse takes to fade in and out

interface GraphNode {
  x: number
  y: number
  velocityX: number
  velocityY: number
}

interface Pulse {
  nodeIndexA: number
  nodeIndexB: number
  bornAtTimestamp: number
}

interface ConstellationGraphProps {
  width: number
  height: number
}

export default function ConstellationGraph({ width, height }: ConstellationGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mutable data that changes constantly (every animation frame, every mouse
  // move). Deliberately refs, not state: we draw directly to the canvas
  // ourselves each frame, so there's nothing for a React re-render to do here.
  const nodesRef = useRef<GraphNode[]>([])
  const mousePositionRef = useRef({ x: -9999, y: -9999, isActive: false })
  const pulsesRef = useRef<Pulse[]>([])
  const lastPulseTimestampRef = useRef(0)
  const hasInitializedNodesRef = useRef(false)

  // Seed random starting positions once, the first time we actually know the
  // real pixel size (before that, width/height are 0 and placing nodes would
  // be meaningless).
  useEffect(() => {
    if (!hasInitializedNodesRef.current && width > 0 && height > 0) {
      hasInitializedNodesRef.current = true
      const nodeCount = Math.round(
        Math.min(MAX_NODE_COUNT, Math.max(MIN_NODE_COUNT, width * height * REFERENCE_NODE_DENSITY)),
      )
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        velocityX: (Math.random() - 0.5) * 0.22,
        velocityY: (Math.random() - 0.5) * 0.22,
      }))
    }
  }, [width, height])

  // The animation loop.
  useEffect(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement || width === 0 || height === 0) return
    const context = canvasElement.getContext('2d')
    if (!context) return

    const devicePixelRatio = window.devicePixelRatio || 1
    canvasElement.width = width * devicePixelRatio
    canvasElement.height = height * devicePixelRatio
    canvasElement.style.width = `${width}px`
    canvasElement.style.height = `${height}px`
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

    let animationFrameId = 0

    const drawFrame = (currentTimestamp: number) => {
      context.clearRect(0, 0, width, height)
      const nodes = nodesRef.current
      const mousePosition = mousePositionRef.current
      const linkDistance = Math.max(
        MIN_LINK_DISTANCE,
        Math.sqrt((width * height) / nodes.length) * LINK_DISTANCE_FACTOR,
      )

      // Move every node
      for (const node of nodes) {
        node.x += node.velocityX
        node.y += node.velocityY
        if (node.x > width || node.x < -LEFT_FADE_ZONE) node.velocityX *= -1
        if (node.y < 0 || node.y > height) node.velocityY *= -1

        if (mousePosition.isActive) {
          const deltaX = node.x - mousePosition.x
          const deltaY = node.y - mousePosition.y
          const distance = Math.hypot(deltaX, deltaY)
          if (distance < MOUSE_DISTANCE && distance > 0.1) {
            const pullStrength = (1 - distance / MOUSE_DISTANCE) * 0.7
            node.x += (deltaX / distance) * pullStrength
            node.y += (deltaY / distance) * pullStrength
          }
        }
      }

      // 1 = fully visible, 0 = invisible at/past the left boundary
      const edgeFade = nodes.map((node) => Math.max(0, Math.min(1, node.x / LEFT_FADE_ZONE)))

      // Drop any pulse that has finished fading out.
      pulsesRef.current = pulsesRef.current.filter(
        (pulse) => currentTimestamp - pulse.bornAtTimestamp < PULSE_DURATION_MS,
      )

      // Every couple seconds, while the cursor is idle, light up one random
      // connection between two nearby nodes that isn't already lit.
      if (
        !mousePosition.isActive &&
        currentTimestamp - lastPulseTimestampRef.current > PULSE_INTERVAL_MS &&
        pulsesRef.current.length < 2
      ) {
        const nodeIndexesAlreadyPulsing = new Set(
          pulsesRef.current.flatMap((pulse) => [pulse.nodeIndexA, pulse.nodeIndexB]),
        )
        const candidatePairs: [number, number][] = []
        for (let indexA = 0; indexA < nodes.length; indexA++) {
          for (let indexB = indexA + 1; indexB < nodes.length; indexB++) {
            const alreadyPulsing =
              nodeIndexesAlreadyPulsing.has(indexA) || nodeIndexesAlreadyPulsing.has(indexB)
            const closeEnough =
              Math.hypot(nodes[indexA].x - nodes[indexB].x, nodes[indexA].y - nodes[indexB].y) <
              linkDistance
            if (!alreadyPulsing && closeEnough) candidatePairs.push([indexA, indexB])
          }
        }
        if (candidatePairs.length > 0) {
          const [nodeIndexA, nodeIndexB] = candidatePairs[Math.floor(Math.random() * candidatePairs.length)]
          pulsesRef.current.push({ nodeIndexA, nodeIndexB, bornAtTimestamp: currentTimestamp })
          lastPulseTimestampRef.current = currentTimestamp
        }
      }

      // Draw every edge between nodes close enough to be linked.
      for (let indexA = 0; indexA < nodes.length; indexA++) {
        for (let indexB = indexA + 1; indexB < nodes.length; indexB++) {
          const nodeA = nodes[indexA]
          const nodeB = nodes[indexB]
          const distance = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y)
          if (distance >= linkDistance) continue

          const nodeANearMouse =
            mousePosition.isActive && Math.hypot(nodeA.x - mousePosition.x, nodeA.y - mousePosition.y) < MOUSE_DISTANCE
          const nodeBNearMouse =
            mousePosition.isActive && Math.hypot(nodeB.x - mousePosition.x, nodeB.y - mousePosition.y) < MOUSE_DISTANCE
          const proximityStrength = 1 - distance / linkDistance

          const activePulse = pulsesRef.current.find(
            (pulse) =>
              (pulse.nodeIndexA === indexA && pulse.nodeIndexB === indexB) ||
              (pulse.nodeIndexA === indexB && pulse.nodeIndexB === indexA),
          )
          const pulseProgress = activePulse
            ? Math.max(0, Math.sin(((currentTimestamp - activePulse.bornAtTimestamp) / PULSE_DURATION_MS) * Math.PI))
            : 0
          const linkFade = Math.min(edgeFade[indexA], edgeFade[indexB])

          context.beginPath()
          context.moveTo(nodeA.x, nodeA.y)
          context.lineTo(nodeB.x, nodeB.y)
          if (nodeANearMouse && nodeBNearMouse) {
            context.strokeStyle = '#a8646f'
            context.lineWidth = 1.2
            context.globalAlpha = proximityStrength * 0.85 * linkFade
          } else if (activePulse && pulseProgress > 0) {
            context.strokeStyle = '#a8646f'
            context.lineWidth = 0.6 + pulseProgress * 0.7
            context.globalAlpha = (proximityStrength * 0.22 + pulseProgress * 0.55) * linkFade
          } else {
            context.strokeStyle = '#7c8aa8'
            context.lineWidth = 0.6
            context.globalAlpha = proximityStrength * 0.22 * linkFade
          }
          context.stroke()
        }
      }
      context.globalAlpha = 1

      // Draw every node on top of the edges.
      for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        const node = nodes[nodeIndex]
        const nearMouse =
          mousePosition.isActive && Math.hypot(node.x - mousePosition.x, node.y - mousePosition.y) < MOUSE_DISTANCE
        const activePulse = pulsesRef.current.find(
          (pulse) => pulse.nodeIndexA === nodeIndex || pulse.nodeIndexB === nodeIndex,
        )
        const pulseProgress = activePulse
          ? Math.max(0, Math.sin(((currentTimestamp - activePulse.bornAtTimestamp) / PULSE_DURATION_MS) * Math.PI))
          : 0

        context.beginPath()
        const radius = nearMouse ? 2.8 : activePulse ? 1.8 + pulseProgress * 0.8 : 1.8
        context.arc(node.x, node.y, radius, 0, Math.PI * 2)
        context.fillStyle = nearMouse || (activePulse && pulseProgress > 0.1) ? '#a8646f' : '#f5f7fb'
        context.globalAlpha = (nearMouse ? 0.92 : activePulse ? 0.28 + pulseProgress * 0.55 : 0.28) * edgeFade[nodeIndex]
        context.fill()
      }
      context.globalAlpha = 1

      animationFrameId = requestAnimationFrame(drawFrame)
    }

    animationFrameId = requestAnimationFrame(drawFrame)
    return () => cancelAnimationFrame(animationFrameId)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className="block"
      aria-hidden="true"
      onMouseMove={(mouseEvent) => {
        const canvasBounds = mouseEvent.currentTarget.getBoundingClientRect()
        mousePositionRef.current = {
          x: mouseEvent.clientX - canvasBounds.left,
          y: mouseEvent.clientY - canvasBounds.top,
          isActive: true,
        }
      }}
      onMouseLeave={() => {
        mousePositionRef.current.isActive = false
      }}
    />
  )
}
