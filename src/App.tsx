import { useState, createContext, MutableRefObject, useRef } from 'react'
import './App.scss'
import Row from './Row'

interface ScriptContext {
  dialogueType: string,
  dialogue: string,
  emotion: string,
  position: string,
  speaker: string
  script: ScriptType
}

export interface Message {
  m?: string
  q?: string
  char?: string
  label?: string
  next?: string
  res?: {
    m: string
    level?: number // only show if player meets compatability req
    next: string
  }[]
  emotion?: string
  location?: string
  pos?: 'left' | 'right'
}

export interface ScriptType extends Array<Message> { }

const GlobalState: ScriptType = []
export const GlobalContext = createContext(GlobalState)

function App() {

  return (
    <>
      <GlobalContext.Provider value={GlobalState}>
        <div className="wrapper">
          <Row></Row>
        </div>
      </GlobalContext.Provider>
    </>
  )
}

export default App
