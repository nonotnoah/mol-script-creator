import React, { Suspense } from 'react'
import { useState, createContext, MutableRefObject, useRef } from 'react'
import Row from './Row Components/Row'
import { InfoType, Message, ScriptStore, Store } from './types'
import { Button, Fab, TextField } from '@mui/material'
import { Add, Download, ImportExport, Save } from '@mui/icons-material'
import { useParams, useLocation } from 'react-router-dom'
import Loading from './Loading'
import Info from './Row Components/Info'
import { DragDropContext, Draggable, DraggingStyle, DropResult, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  color: isDragging ? 'white' : 'black',
  border: `1px solid black`,
  borderRadius: `10px`,

  ...draggableStyle
})

const getStateObj = (state: ScriptStore) => {
  // reassign script ids to rowRef/Obj on load
  const obj: { [id: number]: Message } = {}
  for (let i = 0; i < state.script.length; i++) {
    obj[state.script[i].id] = state.script[i]
  }
  return obj
}

function ScriptEditor() {
  const location = useLocation()
  const state = location.state as ScriptStore

  const scriptId = React.useRef<string>(state.id)
  const [info, setInfo] = React.useState<InfoType>(state.info || { title: 'Untitled Script', description: '', characters: [], locations: [], start: 700, end: 2300 })
  const rowRef = React.useRef<{ [id: number]: Message }>(getStateObj(state))
  const [rowObj, setRowObj] = React.useState<{ [id: number]: Message }>(getStateObj(state))
  const rowId = React.useRef(state.script.length)
  console.log("🚀 ~ file: ScriptEditor.tsx:31 ~ ScriptEditor ~ rowId:", rowId)
  // React.useEffect(() => {
  //   if (state) {
  //     componentScriptData.current = state.script
  //     setScriptTitle(state.title)
  //     console.log("🚀 ~ file: ScriptEditor.tsx:30 ~ React.useEffect ~ state:", state)
  //     scriptId.current = state.id
  //     console.log('rowObj changed 43')
  //     setRowObj(state.script)
  //     console.log("🚀 ~ file: ScriptEditor.urrent.length
  //     return
  //   }state
  // }, [state])
  // React.useEffect(() => {
  //   console.log('stage changed')
  //   console.log()
  // }, [rowObj])

  const onDragEnd = (result: DropResult) => {
    const source = result.source
    const destination = result.destination
    if (!destination) return

    const items = Array.from(componentScriptData.current)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)
    const newObj = Object.assign({}, items)
    rowRef.current = newObj
    console.log('rowObj changed 63')
    setRowObj(newObj)
    componentScriptData.current = Object.values(newObj)
  }

  const save = () => {
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'null') as Store | null
    console.log("🚀 ~ file: ScriptEditor.tsx:42 ~ save ~ scripts:", scripts)
    const newScript: ScriptStore =
    {
      id: scriptId.current,
      script: msgObjToArray(),
      info: info
    }
    if (scripts != null) {
      console.log('scripts exist, saving over top')
      console.log("🚀 ~ file: ScriptEditor.tsx:68 ~ save ~ newScript:", newScript)
      const updated = { ...scripts, [scriptId.current]: newScript }
      localStorage.setItem('scripts', JSON.stringify(updated))
      return
    }
    console.log('starting new store')
    const updated = { [scriptId.current]: newScript }
    localStorage.setItem('scripts', JSON.stringify(updated))
  }
  const msgObjToArray = () => {
    return Object.values(rowRef.current)
  }
  const addRow = () => {
    const id = rowId.current += 1
    console.log(id, 'added')
    const newRow: Message = { type: 'Dialogue', id: id, m: '', res: [], label: '', emotion: 'neutral', pos: 'left', char: '' }
    rowRef.current[id] = newRow
    console.log('rowObj changed 99')
    setRowObj({ ...rowRef.current })
  }
  const editRow = (newRow: Message, id: number) => {
    console.log(id, 'updated', newRow)
    console.log('ref:', rowRef.current, 'state:', rowObj)
    // const rowIdx = Object.values(rowRef.current).find(row => row.id === id)
    // if (rowIdx) rowRef.current[rowIdx] = newRow
    rowRef.current[id] = newRow
    console.log('rowObj changed 107')
    setRowObj({ ...rowRef.current })
    console.log('ref:', rowRef.current, 'state:', rowObj)
  }
  const deleteRow = (id: number) => {
    console.log(id, 'deleted')
    delete rowRef.current[id]
    if (Object.keys(rowObj).length == 0) {
      console.log('rowObj changed 130')
      setRowObj({})
      return
    }
    console.log('rowObj changed 134')
    setRowObj({ ...rowRef.current })
  }


  return (
    <>
      <div className="wrapper">
        <div className="title-wrapper" >
          <Info
            sendInfo={(info) => setInfo(info)}
            infoProp={info}
          />
          <div className="save-script-btn-wrapper">
            <div className="save-script-btn">
              <Fab onClick={() => save()}><Save /></Fab>
            </div>
          </div>
          <div className="export-script-btn-wrapper">
            <div className="export-script-btn">
              <Fab onClick={() => exportScript()}><Download /></Fab>
            </div>
          </div>
        </div>
        {Object.values(rowObj).map((row, idx) => (
          <div
            className="row-wrapper"
            key={`row${row.id}`}
          >
            {/* {row.id} {idx} */}
            <Row
              // key={`row${row.id}`}
              id={row.id}
              rowData={row}
              returnRowData={(val, id) => editRow(val, id)}
              deleteRow={id => deleteRow(id)}
            />
          </div>
        ))}
        <div className="add-row-btn-wrapper">
          <div className="add-row-btn">
            <Fab onClick={() => addRow()}><Add /></Fab>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScriptEditor

