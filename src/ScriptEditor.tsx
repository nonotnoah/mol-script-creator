import React, { Suspense } from 'react'
import { useState, createContext, MutableRefObject, useRef } from 'react'
import Row from './Row Components/Row'
import { Message, ScriptStore, Store } from './types'
import { Button, Fab, TextField } from '@mui/material'
import { Add, Save } from '@mui/icons-material'
import { useParams, useLocation } from 'react-router-dom'
import Loading from './Loading'
import Title from './Row Components/Title'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// interface ScriptEditProps {
//   loadedScript: ScriptStore,
// }
const getItemStyle = (isDragging: boolean, draggableStyle: React.CSSProperties) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  color: isDragging ? 'white' : 'black',
  border: `1px solid black`,
  borderRadius: `10px`,

  ...draggableStyle
})

function ScriptEditor() {
  const scriptId = React.useRef(Math.random().toString())
  const [scriptTitle, setScriptTitle] = React.useState('Untitled Script')
  // const scriptTitle = React.useRef('Untitled Script')
  const componentScriptData = React.useRef<Message[]>([])
  const rowRef = React.useRef<{ [id: number]: Message }>({})
  const [rowObj, setRowObj] = React.useState<{ [id: number]: Message }>({})
  const rowId = React.useRef(0)
  // const { params } = useParams()
  const location = useLocation()
  const state = location.state as ScriptStore
  React.useEffect(() => {
    if (state) {
      componentScriptData.current = state.script
      setScriptTitle(state.title)
      console.log("🚀 ~ file: ScriptEditor.tsx:30 ~ React.useEffect ~ state:", state)
      scriptId.current = state.id
      setRowObj(state.script)
      rowId.current = componentScriptData.current.length
      return
    }
  }, [])

  const onDragEnd = (result: DropResult) => {
    const source = result.source
    const destination = result.destination
    if (!destination) return

    const items = Array.from(componentScriptData.current)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)
  }

  const save = () => {
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'null') as Store | null
    console.log("🚀 ~ file: ScriptEditor.tsx:42 ~ save ~ scripts:", scripts)
    if (scripts != null) {
      console.log('scripts exist, saving over top')
      const newScript: ScriptStore =
      {
        id: scriptId.current,
        script: componentScriptData.current,
        title: scriptTitle
      }
      const updated = { ...scripts, [scriptId.current]: newScript }
      localStorage.setItem('scripts', JSON.stringify(updated))
      return
    }
    console.log('starting new store')
    const newScript: ScriptStore =
    {
      id: scriptId.current,
      script: componentScriptData.current,
      title: scriptTitle
    }
    const updated = { [scriptId.current]: newScript }
    localStorage.setItem('scripts', JSON.stringify(updated))
  }
  const addRow = () => {
    const id = rowId.current += 1
    console.log(id, 'added')
    const newRow: Message = { type: 'Dialogue', id: id, m: '', res: [], label: '', emotion: 'neutral', pos: 'left', char: '' }
    rowRef.current[id] = newRow
    setRowObj({ ...rowRef.current })
    componentScriptData.current = [...componentScriptData.current, { ...rowRef.current[id] }]
  }
  const editRowData = (newRow: Message, id: number) => {
    console.log(id, 'updated')
    console.log((newRow.m || 'undef'))
    rowRef.current[id] = newRow
    setRowObj({ ...rowRef.current })

    const rowInScriptObj = componentScriptData.current.find(row => row.id === id)
    if (!rowInScriptObj) {
      return
    }
    const rowIdx = componentScriptData.current.indexOf(rowInScriptObj)
    if ((rowIdx > -1) && componentScriptData.current) {
      componentScriptData.current[rowIdx] = newRow
    }
  }
  const deleteRow = (id: number) => {
    console.log(id, 'deleted')
    delete rowRef.current[id]
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
    setRowObj({ ...rowRef.current })
  }


  return (
    <>
      <div className="wrapper">
        <Title
          sendTitle={(newTitle) => setScriptTitle(newTitle)}
          titleProp={scriptTitle}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(rowObj).map((row, idx) => (
            <div className="row-wrapper" >
              {row.id}
              <Row
                key={`row${row.id}`}
                id={row.id}
                rowData={row}
                returnRowData={(val, id) => editRowData(val, id)}
                deleteRow={id => deleteRow(id)}
              />
            </div>
          ))}
        </DragDropContext>
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

