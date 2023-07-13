import { useState } from 'react'
import './App.css'
import Row from './Row'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="wrapper">
        <Row></Row>
      </div>
    </>
  )
}

export default App
