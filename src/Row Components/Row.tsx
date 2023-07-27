import React from 'react'

import DialogueType from './DialogueType';
import Dialogue from './Dialogue';
import Speaker from './Speaker';
import Emotion from './Emotion';
import Position from './Position';
import Response from './Response';
import Label from './Label';

import { Button, Fab } from '@mui/material'
import { Add, DeleteOutline } from '@mui/icons-material'
import { Res, RowProps } from '../types';
import { Message } from '../types';

interface RowData {
  label: string
  dialogueType: string
  dialogue: string
  speaker: string
  emotion: string
  position: string
}

export default function Row({ rowData, id, returnRowData, deleteRow }: RowProps) {
  console.log("🚀 ~ file: Row.tsx:26 ~ Row ~ rowData:", rowData)
  // manage state for all inputs in this component
  const data = {
    label: rowData.label,
    dialogueType: rowData.type,
    dialogue: rowData.m,
    speaker: rowData.char,
    emotion: rowData.emotion,
    position: rowData.pos,
  }
  const rowDataRef = React.useRef<RowData>(data)
  const [rowDataState, setRowDataState] = React.useState<RowData>(data)
  const editRowData = (key: string, val: string) => {
    rowDataRef.current = { ...rowDataRef.current, [key]: val }
    setRowDataState({ ...rowDataRef.current, [key]: val })
  }

  const resRef = React.useRef<{ [id: number]: JSX.Element }>({})
  const [resObj, setResObj] = React.useState<{ [id: number]: JSX.Element }>({})
  const resId = React.useRef(0)
  const addRes = () => {
    const id = resId.current += 1
    const resCopy = { ...resRef.current }
    resCopy[id] =
      <Response
        key={`response${resId.current}`}
        id={resId.current}
        resData={{ m: '', next: '' }}
        returnResData={(val, id) => editResData(val, id)}
        deleteRes={id => deleteRes(id)}
      />
    addResInRowData(id)
    resRef.current = { ...resCopy }
    setResObj({ ...resCopy })
  }
  const addResInRowData = (id: number) => {
    thisRowData.current.res = [...thisRowData.current.res, { id: id, m: '', next: '' }]
    // console.log("🚀 ~ file: App.tsx:43 ~ addRowInScriptData ~ componentScriptData:", componentScriptData.current)
  }
  const editResInRowData = (res: Res, id: number) => {
    const resInRowObj = thisRowData.current.res?.find(res => res.id === id)
    if (!resInRowObj) {
      return
    }
    const resIdx = thisRowData.current.res?.indexOf(resInRowObj)
    if ((resIdx > -1) && thisRowData.current.res) {
      thisRowData.current.res[resIdx] = { id: id, m: res.m, next: res.next }
    }
  }
  const deleteResInRowData = (id: number) => {
    const resInRowObj = thisRowData.current.res?.find(res => res.id === id)
    if (!resInRowObj) {
      return
    }
    const filtered = thisRowData.current.res.filter(res => res != resInRowObj)
    thisRowData.current.res = filtered
  }
  const editResData = (res: Res, id: number) => {
    editResInRowData(res, id)
    const resCopy = { ...resRef.current }
    resCopy[id] =
      <Response
        key={`response${id}`}
        id={id}
        resData={{ m: res.m, next: res.next }}
        returnResData={(val, id) => editResData(val, id)}
        deleteRes={id => deleteRes(id)}
      />
    resRef.current = { ...resCopy }
    setResObj({ ...resCopy })
    console.log("🚀 ~ file: Row.tsx:133 ~ Row ~ rowData:", thisRowData.current)
  }
  const deleteRes = (id: number) => {
    deleteResInRowData(id)
    const resCopy = { ...resRef.current }
    delete resCopy[id]
    if (Object.keys(resRef.current).length == 0) {
      thisRowData.current.res = []
      resRef.current = {}
      setResObj({})
      return
    }
    resRef.current = { ...resCopy }
    // console.log("🚀 ~ file: App.tsx:95 ~ deleteRow ~ rowRef.current:", rowRef.current)
    setResObj({ ...resCopy })
  }

  const thisRowData = React.useRef<Message>({ type: 'Dialogue', id: id, m: '', res: [], char: '', label: '', emotion: '', pos: '' })

  React.useEffect(() => {
    if (rowDataState.dialogueType == 'Narrator') {
      thisRowData.current = {
        type: 'Narrator',
        id: id,
        m: rowDataRef.current.dialogue,
        label: rowDataRef.current.label,
        emotion: '',
        char: 'system',
        res: [],
        pos: ''
      }
      resRef.current = {}
      setResObj({})
    }
    if (rowDataState.dialogueType == 'Dialogue') {
      thisRowData.current = {
        type: 'Dialogue',
        id: id,
        m: rowDataRef.current.dialogue,
        label: rowDataRef.current.label,
        emotion: rowDataRef.current.emotion,
        pos: rowDataRef.current.position,
        char: rowDataRef.current.speaker,
        res: thisRowData.current.res
      }
    }
    returnRowData(thisRowData.current, id)
    // console.log("🚀 ~ file: Row.tsx:133 ~ Row ~ rowData:", componentRowData.current)

  }, [rowDataState])


  return (
    <>
      <div className='row' key={`row${rowData.id}`}>
        <div className="delete-row-btn-wrapper">
          <Fab size='small' onClick={() => deleteRow(id)} className='delete-row-btn hide'>
            <DeleteOutline color='error' />
          </Fab>
        </div>
        <Label initVal={rowData.label} handleChange={(value) => editRowData('label', value)} />
        <DialogueType initVal={rowData.type} handleChange={(value) => editRowData('dialogueType', value)} />
        <Dialogue initVal={rowData.m} handleChange={(value) => editRowData('dialogue', value)} />
        {(rowDataState.dialogueType == 'Dialogue') && (
          <>
            <Speaker initVal={rowData.char} handleChange={(value) => editRowData('speaker', value)} />
            <Emotion initVal={rowData.emotion} handleChange={(value) => editRowData('emotion', value)} />
            <Position initVal={rowData.pos} handleChange={(value) => editRowData('position', value)} />
            <div className="add-res-btn-wrapper ">
              <Fab
                className='add-res-btn hide'
                size='small'
                onClick={() => addRes()}
              ><Add /></Fab>
            </div>
          </>
        )}
        {(rowDataState.dialogueType == 'Narrator') && (
          < div className="add-res-btn-wrapper" />
        )}
      </div >
      {(rowDataState.dialogueType == 'Dialogue') && (
        <>
          {Object.values(resObj).map(res => (
            res
          ))}
        </>
      )}
    </>
  )
}
