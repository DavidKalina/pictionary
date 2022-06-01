import { useEffect, useState } from 'react'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'
import socket from './contexts/socket'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    socket.emit('insane')
  }, [])

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
