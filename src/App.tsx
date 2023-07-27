import React from 'react'
import ScriptEditor from './ScriptEditor'
import Home from './Home/Home'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Outlet></Outlet>
    </>
  )
}

export default App
