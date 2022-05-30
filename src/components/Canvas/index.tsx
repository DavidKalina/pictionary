import { useEffect, useRef, useState } from 'react'
import useCanvas from '../../hooks/useCanvas'

const Canvas = () => {
  const [{ x, y }, setPos] = useState({ x: 0, y: 0 })
  const [drawing, setDrawing] = useState(false)
  const [pathId, setPathId] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  function handleMouseMove(event: any) {
    const { current: canvas } = canvasRef

    if (!canvas) return

    setPos({
      x: event.clientX - canvas.offsetLeft,
      y: event.clientY - canvas.offsetTop,
    })
  }

  useEffect(() => {
    const { current: canvas } = canvasRef

    if (!canvas) return
    const ctx = canvasRef?.current?.getContext('2d') as CanvasRenderingContext2D
    let frame = requestAnimationFrame(loop)

    function draw() {
      if (!drawing) {
        ctx.beginPath()
        return
      }
      ctx.lineWidth = 10
      ctx.lineCap = 'round'
      ctx.lineTo(x, y)
      ctx.strokeStyle = 'red'
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }

    function loop(t: any) {
      frame = requestAnimationFrame(loop)
      draw()
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [drawing, x, y])

  useEffect(() => {
    const { current: canvas } = canvasRef

    if (!canvas) return

    canvas.style.height = '100%'
    canvas.style.width = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }, [])

  useEffect(() => {
    if (drawing) {
      setPathId(prev => prev + 1)
    }
  }, [drawing])

  useCanvas(drawing, { pathId, x, y })

  return (
    <>
      {pathId}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setDrawing(true)}
        onMouseUp={() => setDrawing(false)}
      />
    </>
  )
}

export default Canvas
