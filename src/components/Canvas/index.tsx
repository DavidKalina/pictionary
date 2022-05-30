import { useEffect, useRef, useState } from 'react'

const Canvas = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [drawing, setDrawing] = useState(false)
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
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = 'red'
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
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
  }, [drawing, pos])

  useEffect(() => {
    const { current: canvas } = canvasRef

    if (!canvas) return

    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }, [])

  return (
    <canvas
      className="border-4 border-blue-800 max-h-screen"
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setDrawing(true)}
      onMouseUp={() => setDrawing(false)}
    />
  )
}

export default Canvas
