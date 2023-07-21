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
  const rowRef = React.useRef<{ [id: number]: Message }>({})
  const [rowObj, setRowObj] = React.useState<{ [id: number]: Message }>({})
  const rowId = React.useRef(0)
  const addRow = () => {
    const id = rowId.current += 1
    console.log(id, 'added')
    const rowCopy = { ...rowRef.current }
    rowCopy[id] = { id: id, m: '', res: [], label: '', emotion: 'neutral', pos: 'left', char: '' }
    rowRef.current = { ...rowCopy }
    setRowObj({ ...rowCopy })
    componentScriptData.current = [...componentScriptData.current, { ...rowCopy[id] }]
  }
  const editRowData = (newRow: Message, id: number) => {
    console.log(id, 'updated')
    console.log((newRow.m || 'undef'))
    const rowCopy = { ...rowRef.current }
    rowCopy[id] = { ...newRow }
    rowRef.current = { ...rowCopy }
    setRowObj({ ...rowCopy })

    const rowInScriptObj = componentScriptData.current.find(row => row.id === id)
    if (!rowInScriptObj) {
      return
    }
    const rowIdx = componentScriptData.current.indexOf(rowInScriptObj)
    if ((rowIdx > -1) && componentScriptData.current) {
      componentScriptData.current[rowIdx] = { ...newRow }
    }
  }
  const deleteRow = (id: number) => {
    console.log(id, 'deleted')
    const rowCopy = { ...rowRef.current }
    delete rowCopy[id]
    const rowInScriptObj = componentScriptData.current.find(row => row.id === id)
    if (!rowInScriptObj) {
      return
    }
    const filtered = componentScriptData.current.filter(row => row != rowInScriptObj)
    componentScriptData.current = filtered
    if (Object.keys(rowObj).length == 0) {
      componentScriptData.current = []
      setRowObj({})
      return
    }
    rowRef.current = { ...rowCopy }
    setRowObj({ ...rowCopy })
  }

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
        {Object.values(rowObj).map((row, idx) => (
          <div className="row-wrapper" key={idx}>
            {idx} has {Object.entries(row).map(entry => entry)}
            <Row
              id={row.id}
              rowData={row}
              returnRowData={(val, id) => editRowData(val, id)}
              deleteRow={id => deleteRow(id)}
            />
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

