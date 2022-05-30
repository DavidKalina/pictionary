import { useEffect, useState } from 'react'

export const useCanvasPathHistory = (drawing: boolean, { pathId, x, y }: { pathId: number; x: number; y: number }) => {
  const [history, setHistory] = useState<{ [key: number]: { x: number; y: number }[] }>({})

  useEffect(() => {
    if (drawing && pathId) {
      setHistory(prev => {
        if (prev[pathId]) {
          return {
            ...prev,
            [pathId]: [...prev[pathId], { x, y }],
          }
        }
        return {
          ...prev,
          [pathId]: [{ x, y }],
        }
      })
    }
  }, [drawing, x, y, pathId])

  return history
}

export default useCanvasPathHistory
