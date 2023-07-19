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
    const id = rowId.current += 1
    console.log(id, 'added')
    const rowCopy = { ...rowRef.current }
    rowCopy[id] =
      <Row
        // key={`row${rowId.current}`}
        id={id}
        rowData={{ m: '', res: [], label: '', emotion: 'neutral', pos: 'left', }}
        returnRowData={(val, id) => editRowData(val, id)}
        deleteRow={id => deleteRow(id)}
      />
    addRowInScriptData(id)
    rowRef.current = { ...rowCopy }
    console.log("🚀 ~ file: App.tsx:41 ~ addRow ~ rowRef.current:", rowRef.current)
    setRowObj({ ...rowCopy })
  }
  const addRowInScriptData = (id: number) => {
    componentScriptData.current = [...componentScriptData.current, { id: id, m: '', res: [], label: '', emotion: 'neutral', pos: 'left', }]
    // console.log("🚀 ~ file: App.tsx:43 ~ addRowInScriptData ~ componentScriptData:", componentScriptData.current)
  }
  const editRowInScriptData = (newRow: Message, id: number) => {
    const rowInScriptObj = componentScriptData.current.find(row => row.id === id)
    if (!rowInScriptObj) {
      return
    }
    const rowIdx = componentScriptData.current.indexOf(rowInScriptObj)
    if ((rowIdx > -1) && componentScriptData.current) {
      // componentScriptData.current[rowIdx] = { id: id, ...newRow }
    }
  }
  const deleteRowInScriptData = (id: number) => {
    const rowInScriptObj = componentScriptData.current.find(row => row.id === id)
    if (!rowInScriptObj) {
      return
    }
    const filtered = componentScriptData.current.filter(row => row != rowInScriptObj)
    componentScriptData.current = filtered
    // console.log("🚀 ~ file: App.tsx:64 ~ deleteRowInScriptData ~ componentScriptData:", componentScriptData)
  }
  const editRowData = (row: Message, id: number) => {
    console.log(id, 'updated')
    console.log((row.m || 'undef'))
    editRowInScriptData(row, id)
    const rowCopy = { ...rowRef.current }
    rowCopy[id] =
      <Row
        // key={`row${id}`}
        id={id}
        rowData={row}
        returnRowData={(val, id) => editRowData(val, id)}
        deleteRow={id => deleteRow(id)}
      />
    rowRef.current = { ...rowCopy }
    setRowObj({ ...rowCopy })
    console.log("🚀 ~ file: App.tsx:79 ~ editRowData ~ rowRef:", rowRef.current)
  }
  const deleteRow = (id: number) => {
    console.log(id, 'deleted')
    deleteRowInScriptData(id)
    const rowCopy = { ...rowRef.current }
    delete rowCopy[id]
    if (Object.keys(rowRef.current).length == 0) {
      componentScriptData.current = []
      rowRef.current = {}
      setRowObj({})
      return
    }
    rowRef.current = { ...rowCopy }
    console.log("🚀 ~ file: App.tsx:95 ~ deleteRow ~ rowRef.current:", rowRef.current)
    setRowObj({ ...rowCopy })
  }

  // React.useEffect(() => {
  //   componentScriptData
  // }, [rowObj])

  const componentScriptData = React.useRef<Message[]>([])

  return (
    <>
      <GlobalContext.Provider value={GlobalState}>
        <div className="wrapper">
          {Object.values(rowRef.current).map((res, idx) => (
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
