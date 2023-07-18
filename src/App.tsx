import React from 'react'
import { useState, createContext, MutableRefObject, useRef } from 'react'
import './App.scss'
import Row from './Row'
import { Message } from './Row Components/types'
import { Button, Fab } from '@mui/material'
import { Add } from '@mui/icons-material'

interface ScriptContext {
  dialogueType: string,
  dialogue: string,
  emotion: string,
  position: string,
  speaker: string
  script: ScriptType
}

export interface ScriptType extends Array<Message> { }

const GlobalState: ScriptType = []
export const GlobalContext = createContext(GlobalState)

function App() {
  const rowRef = React.useRef<{ [id: number]: JSX.Element }>({})
  const [rowObj, setRowObj] = React.useState<{ [id: number]: JSX.Element }>({})
  const rowId = React.useRef(0)
  const addRow = () => {
    const rowCopy = { ...rowRef.current }
    rowCopy[rowId.current += 1] =
      <Row
        // key={`row${rowId.current}`}
        id={rowId.current}
        rowData={{ m: '', res: [], label: '', emotion: 'neutral', pos: 'left', }}
        returnRowData={(val, id) => setRowData(val, id)}
        deleteRow={id => deleteRow(id)}
      />
    // setRowArray(rowCopy)
    setRowObj(obj => ({ ...obj, ...rowCopy }))
    rowRef.current = { ...rowObj, ...rowCopy }
  }
  const setRowInScriptData = (row: Message, id: number) => {
    const rowInScriptObj = componentScriptData.current.find(row => row.id === id)
    if (!rowInScriptObj) {
      componentScriptData.current = [...componentScriptData.current, { id: id, m: '', res: [], label: '', emotion: 'neutral', pos: 'left', }]
      return
    }
    const rowIdx = componentScriptData.current.indexOf(rowInScriptObj)
    if ((rowIdx > -1) && componentScriptData.current) {
      componentScriptData.current[rowIdx] = { id: id, ...row }
    }
  }
  const deleteRowInScriptData = (id: number) => {
    const rowObj = componentScriptData.current.find(row => row.id === id)
    if (!rowObj) {
      return
    }
    const rowIdx = componentScriptData.current.indexOf(rowObj)
    if ((rowIdx > -1) && componentScriptData.current) {
      delete componentScriptData.current[rowIdx]
    }
  }
  const setRowData = (row: Message, id: number) => {
    setRowInScriptData(row, id)
    const rowCopy = { ...rowRef.current }
    rowCopy[id] =
      <Row
        // key={`row${id}`}
        id={id}
        rowData={{ ...row }}
        returnRowData={(val, id) => setRowData(val, id)}
        deleteRow={id => deleteRow(id)}
      />
    setRowObj(obj => ({ ...obj, ...rowCopy }))
    rowRef.current = { ...rowObj, ...rowCopy }
    console.log("🚀 ~ file: Row.tsx:133 ~ Row ~ rowData:", componentScriptData.current)
  }
  const deleteRow = (id: number) => {
    deleteRowInScriptData(id)
    const rowCopy = { ...rowRef.current }
    delete rowCopy[id]
    if (Object.keys(rowRef.current).length == 0) {
      setRowObj({})
      rowRef.current = {}
      return
    }
    setRowObj(rowCopy)
    rowRef.current = { ...rowCopy }
  }

  // React.useEffect(() => {
  //   componentScriptData
  // }, [rowObj])

  const componentScriptData = React.useRef<Message[]>([])

  return (
    <>
      <GlobalContext.Provider value={GlobalState}>
        <div className="wrapper">
          {Object.values(rowObj).map((res, idx) => (
            <div className="row-wrapper" key={idx}>{res}</div>
          ))}
          <div className="add-row-btn-wrapper">
            <div className="add-row-btn">
              <Fab onClick={() => addRow()}><Add /></Fab>
            </div>
          </div>
        </div>
      </GlobalContext.Provider>
    </>
  )
}

export default App
