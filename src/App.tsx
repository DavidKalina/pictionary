import { useState } from 'react'
import Canvas from './components/Canvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border h-full border-green-500 grow-[4]">Users List</div>
      <div className="border h-full border-green-500 flexgrow-6]">
        <Canvas />
      </div>
      <div className="border h-full border-green-500 grow-[2]">Insane</div>
    </div>
  )
}

export default App
