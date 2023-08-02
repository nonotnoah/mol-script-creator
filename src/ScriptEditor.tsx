import React from 'react'
import Row from './Row Components/Row'
import { InfoType, Message, ScriptStore, Store } from './types'
import { Fab, Tooltip, } from '@mui/material'
import { Add, Code, Home, Save } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import Info from './Row Components/Info'
import { DragDropContext, Draggable, DropResult, Droppable, } from 'react-beautiful-dnd';
import copy from 'copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast';

function ScriptEditor() {
  const location = useLocation()
  const state = location.state as ScriptStore

  const [info, setInfo] = React.useState<InfoType>(state.info)
  const rowRef = React.useRef<Message[]>(state.script)
  const [rowObj, setRowObj] = React.useState<Message[]>(state.script)
  const rowId = React.useRef(state.script.length)
  console.log("🚀 ~ file: ScriptEditor.tsx:31 ~ ScriptEditor ~ rowId:", rowId)

  const handleOnDragEnd = (result: DropResult) => {
    const source = result.source
    const destination = result.destination
    if (!destination) return

    const items = Array.from(Object.values(rowObj))
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)

    rowRef.current = items
    setRowObj(items)
  }

  const copyCode = () => {
    const newScript: ScriptStore =
    {
      id: state.id,
      script: rowRef.current,
      info: info
    }
    copy(JSON.stringify(newScript))
    toast.success('Code copied to clipboard.')
  }

  const saveScript = () => {
    toast.success('Saved script.')
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'null') as Store | null
    console.log("🚀 ~ file: ScriptEditor.tsx:42 ~ save ~ scripts:", scripts)
    const newScript: ScriptStore =
    {
      id: state.id,
      script: rowRef.current,
      info: info
    }
    if (scripts != null) {
      const updated = { ...scripts, [state.id]: newScript }
      console.log('scripts exist, saving', state.id, 'over top', updated)
      localStorage.setItem('scripts', JSON.stringify(updated))
      return
    }
    const updated = { [state.id]: newScript }
    console.log('starting new store', updated)
    localStorage.setItem('scripts', JSON.stringify(updated))
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
      pos: rowRef.current.length > 0 ? rowRef.current[rowRef.current.length - 1].pos : 'left',
      char: rowRef.current.length > 0 ? rowRef.current[rowRef.current.length - 1].char : '',
      location: rowRef.current.length > 0 ? rowRef.current[rowRef.current.length - 1].location : ''
    }
    rowRef.current.push(newRow)
    setRowObj([...rowRef.current])
  }
  const editRow = (newRow: Message, id: number) => {
    console.log(id, 'updated', newRow)
    const rowIdx = rowRef.current.findIndex(row => row.id === id)
    if (rowIdx > -1) rowRef.current.splice(rowIdx, 1, newRow)
    console.log('ref:', rowRef.current, 'state:', rowObj)
  }
  const deleteRow = (id: number) => {
    console.log(id, 'deleted')
    const rowIdx = rowRef.current.findIndex(row => row.id === id)
    if (rowIdx > -1) rowRef.current.splice(rowIdx, 1)
    if (Object.keys(rowObj).length == 0) {
      setRowObj([])
      return
    }
    setRowObj([...rowRef.current])
  }

  return (
    <>
      <Toaster />
      <div className="wrapper">
        <div className="title-wrapper" >
          <Link to='/'>
            <div className="home-btn-wrapper">
              <div className="home-btn">
                <Tooltip title={'Go Home'}>
                  <Fab ><Home /></Fab>
                </Tooltip>
              </div>
            </div>
          </Link>
          <Info
            sendInfo={(info) => setInfo(info)}
            infoProp={info}
          />
          <div className="save-script-btn-wrapper">
            <div className="save-script-btn">
              <Tooltip title={'Save'}>
                <Fab onClick={() => saveScript()}><Save /></Fab>
              </Tooltip>
            </div>
          </div>
          <div className="export-script-btn-wrapper">
            <div className="export-script-btn">
              <Tooltip title={'Copy Code'}>
                <Fab onClick={() => copyCode()}><Code /></Fab>
              </Tooltip>
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
                  rowObj.map((row, idx) => (
                    <Draggable
                      key={`row${row.id}`}
                      draggableId={row.id.toString()}
                      index={idx}
                    >
                      {(provided) => (
                        <div
                          className="row-wrapper"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className='drag-handle-wrapper'
                          >
                            <img className="drag-handle" src='/drag.png' />
                          </div>
                          <Row
                            id={row.id}
                            rowData={row}
                            characters={info.characters.map(char => char.trim())}
                            locations={info.locations.map(local => local.trim())}
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
            <Tooltip title={'Add Row'} placement='top' >
              <Fab onClick={() => addRow()}><Add /></Fab>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScriptEditor

