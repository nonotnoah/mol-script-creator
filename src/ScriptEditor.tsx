import React, { Suspense } from 'react'
import { useState, createContext, MutableRefObject, useRef } from 'react'
import Row from './Row Components/Row'
import { Message, ScriptStore, Store } from './types'
import { Button, Fab, TextField } from '@mui/material'
import { Add, LocalConvenienceStoreOutlined, PriorityHigh, Save } from '@mui/icons-material'
import { useParams, useLocation } from 'react-router-dom'
import Loading from './Loading'
import Title from './Row Components/Title'
import { DragDropContext, Draggable, DraggingStyle, DropResult, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';

// interface ScriptEditProps {
//   loadedScript: ScriptStore,
// }
const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  color: isDragging ? 'white' : 'black',
  border: `1px solid black`,
  borderRadius: `10px`,

  ...draggableStyle
})

function ScriptEditor() {
  const location = useLocation()
  const state = location.state as ScriptStore

  const scriptId = React.useRef<string>(state.id)
  const [scriptTitle, setScriptTitle] = React.useState(state.title)
  // const scriptTitle = React.useRef('Untitled Script')
  const componentScriptData = React.useRef<Message[]>(state.script)
  const rowRef = React.useRef<{ [id: number]: Message }>(Object.assign({}, state.script))
  console.log('rowObj changed 31')
  const [rowObj, setRowObj] = React.useState<{ [id: number]: Message }>(Object.assign({}, state.script))
  const rowId = React.useRef(state.script.length)
  // const { params } = useParams()
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
    if (scripts != null) {
      console.log('scripts exist, saving over top')
      const newScript: ScriptStore =
      {
        id: scriptId.current,
        script: componentScriptData.current,
        title: scriptTitle
      }
      console.log("🚀 ~ file: ScriptEditor.tsx:68 ~ save ~ newScript:", newScript)
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
    console.log('rowObj changed 99')
    setRowObj({ ...rowRef.current })
    componentScriptData.current = [...componentScriptData.current, { ...rowRef.current[id] }]
  }
  const editRowData = (newRow: Message, id: number) => {
    console.log(id, 'updated')
    console.log((newRow.m || 'undef'))
    rowRef.current[id] = newRow
    console.log('rowObj changed 107')
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
        <Title
          sendTitle={(newTitle) => setScriptTitle(newTitle)}
          titleProp={scriptTitle}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='scriptRows'>
            {(provided) => (
              <div className="scriptRowDroppable" {...provided.droppableProps} ref={provided.innerRef}>
                {Object.values(rowObj).map((row, idx) => (
                  <Draggable key={row.id} draggableId={row.id.toString()} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <div className="row-wrapper" >
                          {row.id} {idx}
                          <Row
                            key={`row${row.id}`}
                            id={row.id}
                            rowData={row}
                            returnRowData={(val, id) => editRowData(val, id)}
                            deleteRow={id => deleteRow(id)}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
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

