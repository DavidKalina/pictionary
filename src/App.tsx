import { useState } from 'react'
import Canvas from './components/Canvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex h-100vh">
      <div className="border border-green-500 grow-[1]">Users List</div>
      <div className="border border-green-500 grow-[8]">
        <Canvas />
      </div>
      <div className="border border-green-500 grow-[1]">Insane</div>
    </div>
  )
}

export default App
