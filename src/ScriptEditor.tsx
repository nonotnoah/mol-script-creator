import React from 'react'
import Row from './Row Components/Row'
import { InfoType, Message, OldScriptStore, ScriptStore, Store } from './types'
import { Fab, Tooltip, } from '@mui/material'
import { Add, Code, Home, Save } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import Info from './Row Components/Info'
import { DragDropContext, Draggable, DropResult, Droppable, } from 'react-beautiful-dnd';
import copy from 'copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader'

function ScriptEditor() {
  const location = useLocation()
  const state = React.useRef(location.state as ScriptStore)
  if (!('harmony' in state.current.script[0])) {
    state.current.script.map(oldMsg => oldMsg['harmony'] = 0)
  }

  const [info, setInfo] = React.useState<InfoType>(state.current.info)
  const rowRef = React.useRef<Message[]>(state.current.script)
  const [rowObj, setRowObj] = React.useState<Message[]>(state.current.script)
  const rowId = React.useRef(state.current.script.length)
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
      id: state.current.id,
      script: rowRef.current,
      info: {
        ...info,
        characters: info.characters.map(char => char.trim()),
        locations: info.locations.map(local => local.trim())
      }
    }
    copy(JSON.stringify(newScript, null, 2))
    toast.success('Code copied to clipboard.')
  }

  const saveScript = () => {
    toast.success('Saved script.')
    const scripts = JSON.parse(localStorage.getItem('scripts') || 'null') as Store | null
    console.log("🚀 ~ file: ScriptEditor.tsx:42 ~ save ~ scripts:", scripts)
    const newScript: ScriptStore | OldScriptStore =
    {
      id: state.current.id,
      script: rowRef.current,
      info: info
    }
    // updates old scripts with new property if missing
    if (!('harmony' in newScript.script[0])) {
      newScript.script.map(oldMsg => oldMsg['harmony'] = 0)
    }
    if (scripts != null) {
      const updated = { ...scripts, [state.current.id]: newScript }
      console.log('scripts exist, saving', state.current.id, 'over top', updated)
      localStorage.setItem('scripts', JSON.stringify(updated))
      return
    }
    const updated = { [state.current.id]: newScript }
    console.log('starting new store', updated)
    localStorage.setItem('scripts', JSON.stringify(updated))
  }

  const addRow = () => {
    const id = rowId.current += 1
    console.log(id, 'added')
    const newRow: Message = {
      type: rowRef.current.length > 0 ? rowRef.current[rowRef.current.length - 1].type : 'Dialogue',
      id: id,
      m: '',
      res: [],
      label: '',
      emotion: 'neutral',
      pos: rowRef.current.length > 0 ? rowRef.current[rowRef.current.length - 1].pos : 'left',
      char: rowRef.current.length > 0 ? rowRef.current[rowRef.current.length - 1].char : '',
      location: rowRef.current.length > 0 ? rowRef.current[rowRef.current.length - 1].location : '',
      harmony: 0
    }
    rowRef.current.push(newRow)
    setRowObj([...rowRef.current])
  }
  const editRow = (newRow: Message, id: number) => {
    if (newRow.type != 'Harmony') {
      newRow.harmony = 0
    }
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

  const [loadedCode, setLoadedCode] = React.useState('')
  const loadCode = (code: string) => {
    try {
      const newState = JSON.parse(code) as ScriptStore | OldScriptStore | undefined
      if (newState) {
        if (!newState.script || !newState.id || !newState.info) {
          toast.error('Invalid Script Code')
          console.warn(newState, 'missing something')
          return
        }
        // attaches missing property if not present
        if (!('harmony' in newState.script[0])) {
          newState.script.map(oldMsg => oldMsg['harmony'] = 0)
        }
        //@ts-expect-error missing properties will be attached
        state.current = newState
        console.log("🚀 ~ file: ScriptEditor.tsx:112 ~ loadCode ~ state.current:", state.current)
        setInfo(state.current.info)
        rowRef.current = state.current.script
        setRowObj(state.current.script)
        const ids = rowRef.current.map(row => row.id)
        rowId.current = Math.max(...ids) + 1
        setLoadedCode(code)
        toast.success('Loaded Code Successfully')
      }
    }
    catch (e: unknown) {
      if (e instanceof SyntaxError) {
        toast.error('Invalid Script Code')
      }
      console.warn('Invalid JSON')
      return
    }

  }
  const highLightLabel = (label: string) => {
    const matchingLabels = rowRef.current.filter(msg => msg.label == label)
    const matchingNexts = rowRef.current.map(msg => msg.res.filter(next => next.next == label))
    // matchingLabels.map(msg => msg.highlight = true)
    matchingNexts.map(msg => msg.highlight = true)
    setRowObj([...rowRef.current])
  }
  const blurLabel = (label: string) => {
    const matchingLabels = rowRef.current.filter(msg => msg.label == label)
    // const matchingNexts = rowRef.current.filter(msg => msg.res.map(next => next.next == label))
    matchingLabels.map(msg => msg.highlight = false)
    // matchingNexts.map(msg => msg.highlight = false)
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
          <Loader
            sendCode={code => loadCode(code)}
            code={loadedCode}
          />
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
                            locations={info.locations.map(loc => loc.trim())}
                            returnRowData={(val, id) => editRow(val, id)}
                            deleteRow={id => deleteRow(id)}
                            onLabelFocus={(label) => highLightLabel(label)}
                            onLabelBlur={(label) => blurLabel(label)}
                            highlight={row.highlight}
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

