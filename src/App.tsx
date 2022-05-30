import { useState } from 'react'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border h-full border-pink-500 w-1/4">Users List</div>

      <div className="border h-full border-green-500">
        <Toolbar />
        <Canvas />
      </div>
      <div className="border h-full border-green-500 w-1/4">Insane</div>
    </div>
  )
}

export default App
