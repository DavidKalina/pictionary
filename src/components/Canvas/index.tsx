import { useRef } from 'react'
import { useCanvas } from '../../hooks/useCanvas'
import { useCanvasPathHistory } from '../../hooks/useCanvasPathHistory'

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const { drawing, pathId, x, y, setDrawing, handleMouseMove } = useCanvas(canvasRef)

  const history = useCanvasPathHistory(drawing, { pathId, x, y })

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
