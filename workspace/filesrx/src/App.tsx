import { BrowserRouter, Route , Routes  } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Uploadpage from './pages/upload'
import Download from './pages/download'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Uploadpage/>}></Route>
     <Route path='/:id' element={<Download/>}></Route>

    </Routes>

    </BrowserRouter>

  )
}

export default App
