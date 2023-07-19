import React from 'react'
import { useState, createContext, MutableRefObject, useRef } from 'react'
import Row from './Row Components/Row'
import { Message, ScriptStore } from './types'
import { Button, Fab } from '@mui/material'
import { Add, Save } from '@mui/icons-material'

function ScriptEditor(script?: Message[], title: string) {
  const loadScript = () => {
    script && script.map(msg => {
      const id = rowId.current += 1
      const importedMsg = {
        m: msg.m || '',
        char: msg.char || '',
        res: msg.res || [],
        label: msg.label || '',
        emotion: msg.emotion || 'neutral',
        pos: msg.pos || 'left',
      }
      componentScriptData.current = [...componentScriptData.current, importedMsg]
      rowRef.current[id] =
        <Row
          // key={`row${rowId.current}`}
          id={id}
          rowData={importedMsg}
          returnRowData={(val, id) => editRowData(val, id)}
          deleteRow={id => deleteRow(id)}
        />
    })
    setRowObj({ ...rowRef.current })
  }
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
        rowData={{ m: '', res: [], label: '', emotion: 'neutral', pos: 'left', char: '' }}
        returnRowData={(val, id) => editRowData(val, id)}
        deleteRow={id => deleteRow(id)}
      />
    addRowInScriptData(id)
    rowRef.current = { ...rowCopy }
    console.log("🚀 ~ file: App.tsx:41 ~ addRow ~ rowRef.current:", rowRef.current)
    setRowObj({ ...rowCopy })
  }
  const addRowInScriptData = (id: number) => {
    componentScriptData.current = [...componentScriptData.current, { id: id, m: '', res: [], label: '', emotion: 'neutral', pos: 'left', char: '' }]
    // console.log("🚀 ~ file: App.tsx:43 ~ addRowInScriptData ~ componentScriptData:", componentScriptData.current)
  }
  const editRowInScriptData = (newRow: Message, id: number) => {
    const rowInScriptObj = componentScriptData.current.find(row => row.id === id)
    if (!rowInScriptObj) {
      return
    }
    const rowIdx = componentScriptData.current.indexOf(rowInScriptObj)
    if ((rowIdx > -1) && componentScriptData.current) {
      componentScriptData.current[rowIdx] = { id: id, ...newRow }
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

  const save = () => {
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'false') as ScriptStore[] | boolean
    if (typeof scripts === 'object') {
      const updated = [...scripts, { script: componentScriptData.current, title: title }]
      localStorage.setItem('scripts', JSON.stringify(updated))
      return
    }
    const updated = [{ script: componentScriptData.current, title: title }]
    localStorage.setItem('scripts', JSON.stringify(updated))
  }
  return (
    <>
      <div className="wrapper">
        {Object.values(rowObj).map((res, idx) => (
          <div className="row-wrapper" key={idx}>
            {res}
          </div>
        ))}
        <div className="add-row-btn-wrapper">
          <div className="add-row-btn">
            <Fab onClick={() => addRow()}><Add /></Fab>
          </div>
        </div>
        <div className="save-script-btn-wrapper">
          <div className="save-script-btn">
            <Fab onClick={() => save()}><Save /></Fab>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScriptEditor

