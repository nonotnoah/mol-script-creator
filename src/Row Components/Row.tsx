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
import { ResponseType, RowProps } from '../types';
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
  const thisRowData = React.useRef<Message>({ type: 'Dialogue', id: id, m: '', res: [], char: '', label: '', emotion: '', pos: '' })
  const editRowData = (key: keyof RowData, val: string) => {
    rowDataRef.current[key] = val
    setRowDataState({ ...rowDataRef.current, [key]: val })
  }

  const resRef = React.useRef<ResponseType[]>(rowData.res)
  const [resObj, setResObj] = React.useState<ResponseType[]>(rowData.res)
  const resId = React.useRef(rowData.res.length)
  console.log("🚀 ~ file: Row.tsx:47 ~ Row ~ resId:", resId)
  const addRes = () => {
    const id = resId.current += 1
    const newRes: ResponseType = { id: id, m: '', next: '' }
    resRef.current[id] = newRes
    setResObj({ ...resRef.current })
    thisRowData.current = { ...thisRowData.current, res: [...resRef.current] }
  }
  const editRes = (res: ResponseType, id: number) => {
    resRef.current[id] = res
    setResObj({ ...resRef.current })

    console.log(thisRowData.current)
    // const resInRowObj = thisRowData.current['res'].find(res => res.id === id)
    // if (!resInRowObj) {
    //   return
    // }
    // const resIdx = thisRowData.current['res'].indexOf(resInRowObj)
    // if ((resIdx > -1) && thisRowData.current['res']) {
    //   thisRowData.current['res'].splice(resIdx, 1, res)
    // }
  }
  const deleteRes = (id: number) => {
    delete resRef.current[id]
    const resInRowObj = thisRowData.current['res'].find(res => res && res.id === id)
    if (!resInRowObj) {
      return
    }
    const filtered = thisRowData.current['res'].filter(res => res != resInRowObj)
    thisRowData.current['res'] = filtered
    if (Object.keys(resRef.current).length == 0) {
      thisRowData.current.res = []
      resRef.current = []
      setResObj([])
      return
    }
    setResObj({ ...resRef.current })
  }


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
      resRef.current = []
      setResObj([])
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
                // onClick={() => addRes()}
              ><Add /></Fab>
            </div>
          </>
        )}
        {(rowDataState.dialogueType == 'Narrator') && (
          < div className="add-res-btn-wrapper" />
        )}
      </div >
      {/* {(rowDataState.dialogueType == 'Dialogue') && (
        <>
          {Object.values(resObj).map(res => (
            <Response
              key={`response${resId.current}`}
              id={resId.current}
              resData={res}
              returnResData={(val, id) => editRes(val, id)}
              deleteRes={id => deleteRes(id)}
            />
          ))}
        </>
      )} */}
    </>
  )
}
