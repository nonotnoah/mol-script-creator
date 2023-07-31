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
  const [info, setInfo] = React.useState<InfoType>(state.info)
  const rowRef = React.useRef<Message[]>(state.script)
  const [rowObj, setRowObj] = React.useState<Message[]>(state.script)
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

  const handleOnDragEnd = (result: DropResult) => {
    const source = result.source
    const destination = result.destination
    if (!destination) return

    const items = Array.from(Object.values(rowObj))
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)

    // const newObj: { [id: number]: Message } = {}
    // for (let i = 0; i < items.length; i++) {
    //   newObj[items[i].id] = items[i]
    // }
    // const newObj = Object.assign({}, items)
    rowRef.current = items
    console.log('rowObj changed 63')
    setRowObj(items)
  }

  const save = () => {
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'null') as Store | null
    console.log("🚀 ~ file: ScriptEditor.tsx:42 ~ save ~ scripts:", scripts)
    const newScript: ScriptStore =
    {
      id: scriptId.current,
      script: rowRef.current,
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
  const exportScript = () => {
    const script = JSON.stringify(rowRef.current)
    const x = window.open();
    if (!x) return
    x.document.open();
    x.document.write('<html><body><pre>' + script + '</pre></body></html>');
    x.document.close();
  }
  const addRow = () => {
    const id = rowId.current += 1
    console.log(id, 'added')
    const newRow: Message = {
      type: 'Dialogue',
      id: id,
      m: '',
      res: [],
      label: '',
      emotion: 'neutral',
      pos: 'left',
      char: '',
      location: ''
    }
    rowRef.current.push(newRow)
    console.log('rowObj changed 99')
    setRowObj([...rowRef.current])
  }
  const editRow = (newRow: Message, id: number) => {
    console.log(id, 'updated', newRow)
    console.log('ref:', rowRef.current, 'state:', rowObj)
    const rowIdx = rowRef.current.findIndex(row => row.id === id)
    if (rowIdx) rowRef.current.splice(rowIdx, 1, newRow)
    // setRowObj({ ...rowRef.current })
    console.log('rowObj changed 107')
    console.log('ref:', rowRef.current, 'state:', rowObj)
  }
  const deleteRow = (id: number) => {
    console.log(id, 'deleted')
    const rowIdx = rowRef.current.findIndex(row => row.id === id)
    if (rowIdx) rowRef.current.splice(rowIdx, 1)
    if (Object.keys(rowObj).length == 0) {
      console.log('rowObj changed 130')
      setRowObj([])
      return
    }
    console.log('rowObj changed 134')
    setRowObj([...rowRef.current])
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

        <DragDropContext
          onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='rows'>
            {(provided) => (
              <div
                className="row-droppable"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  Object.values(rowObj).map((row, idx) => (
                    <Draggable
                      key={`row${row.id}`}
                      draggableId={row.id.toString()}
                      index={idx}
                    >
                      {(provided) => (
                        <div className="row-wrapper"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className='drag-handle-wrapper'
                          >
                            <img className="drag-handle" src='/drag.png'></img>
                          </div>
                          {/* {row.id} {idx} */}
                          <Row
                            // key={`row${row.id}`}
                            id={row.id}
                            rowData={row}
                            characters={info.characters}
                            locations={info.locations}
                            returnRowData={(val, id) => editRow(val, id)}
                            deleteRow={id => deleteRow(id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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

