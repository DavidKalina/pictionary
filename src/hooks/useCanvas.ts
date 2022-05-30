import { useState, useEffect, useCallback } from 'react'

export const useCanvas = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) => {
  const [drawing, setDrawing] = useState(false)
  const [{ x, y }, setPos] = useState({ x: 0, y: 0 })
  const [pathId, setPathId] = useState(0)

  const handleMouseMove = useCallback(
    (event: any) => {
      const { current: canvas } = canvasRef

      if (!canvas) return

      setPos({
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop,
      })
    },
    [canvasRef]
  )

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
  }, [canvasRef, drawing, handleMouseMove, x, y])

  useEffect(() => {
    const { current: canvas } = canvasRef

    if (!canvas) return

    canvas.style.height = '100%'
    canvas.style.width = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }, [canvasRef])

  useEffect(() => {
    if (drawing) {
      setPathId(prev => prev + 1)
    }
  }, [drawing])

  return { pathId, drawing, setDrawing, handleMouseMove, x, y }
}
