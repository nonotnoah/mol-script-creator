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
    type: rowData.type,
    m: rowData.m,
    char: rowData.char,
    emotion: rowData.emotion,
    pos: rowData.pos,
  }
  const rowDataRef = React.useRef<Message>(rowData)
  const [rowDataState, setRowDataState] = React.useState<Message>(rowData)
  // const thisRowData = React.useRef<Message>({ type: 'Dialogue', id: id, m: '', res: [], char: '', label: '', emotion: '', pos: '' })
  const editRowData = (key: keyof Message, val: never) => {
      rowDataRef.current[key] = val
      setRowDataState({ ...rowDataRef.current })
      returnRowData(rowDataRef.current, id)
      console.log('updated', key, 'to', val)
  }

  const resRef = React.useRef<ResponseType[]>(rowData.res)
  const [resObj, setResObj] = React.useState<ResponseType[]>(rowData.res)
  const resId = React.useRef(rowData.res.length)
  // console.log("🚀 ~ file: Row.tsx:47 ~ Row ~ resId:", resId)
  const addRes = () => {
    const id = resId.current += 1
    const newRes: ResponseType = { id: id, m: '', next: '' }
    resRef.current[id] = newRes
    setResObj({ ...resRef.current })
    // thisRowData.current = { ...thisRowData.current, res: [...resRef.current] }
  }
  const editRes = (res: ResponseType, id: number) => {
    resRef.current[id] = res
    setResObj({ ...resRef.current })

    // console.log(thisRowData.current)
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
    // const resInRowObj = thisRowData.current['res'].find(res => res && res.id === id)
    // if (!resInRowObj) {
    //   return
    // }
    // const filtered = thisRowData.current['res'].filter(res => res != resInRowObj)
    // thisRowData.current['res'] = filtered
    if (Object.keys(resRef.current).length == 0) {
      // thisRowData.current.res = []
      resRef.current = []
      setResObj([])
      return
    }
    setResObj({ ...resRef.current })
  }


  // React.useEffect(() => {
  //   if (rowDataState.type == 'Narrator') {
  //     thisRowData.current = {
  //       type: 'Narrator',
  //       id: id,
  //       m: rowDataRef.current.dialogue,
  //       label: rowDataRef.current.label,
  //       emotion: '',
  //       char: 'system',
  //       res: [],
  //       pos: ''
  //     }
  //     resRef.current = []
  //     setResObj([])
  //   }
  //   if (rowDataState.type == 'Dialogue') {
  //     thisRowData.current = {
  //       type: 'Dialogue',
  //       id: id,
  //       m: rowDataRef.current.dialogue,
  //       label: rowDataRef.current.label,
  //       emotion: rowDataRef.current.emotion,
  //       pos: rowDataRef.current.position,
  //       char: rowDataRef.current.speaker,
  //       res: thisRowData.current.res
  //     }
  //   }
  //   // returnRowData(thisRowData.current, id)
  //   // console.log("🚀 ~ file: Row.tsx:133 ~ Row ~ rowData:", componentRowData.current)

  // }, [rowDataState])


  return (
    <>
      <div className='row' key={`row${rowData.id}`}>
        <div className="delete-row-btn-wrapper">
          <Fab size='small' onClick={() => deleteRow(id)} className='delete-row-btn hide'>
            <DeleteOutline color='error' />
          </Fab>
        </div>
        <Label val={rowData.label} handleChange={(value) => editRowData('label', value)} />
        <DialogueType val={rowData.type} handleChange={(value) => editRowData('type', value)} />
        <Dialogue val={rowData.m} handleChange={(value) => editRowData('m', value)} />
        {(rowDataState.type == 'Dialogue') && (
          <>
            <Speaker val={rowData.char} handleChange={(value) => editRowData('char', value)} />
            <Emotion val={rowData.emotion} handleChange={(value) => editRowData('emotion', value)} />
            <Position val={rowData.pos} handleChange={(value) => editRowData('pos', value)} />
            <div className="add-res-btn-wrapper ">
              <Fab
                className='add-res-btn hide'
                size='small'
              // onClick={() => addRes()}
              ><Add /></Fab>
            </div>
          </>
        )}
        {(rowDataState.type == 'Narrator') && (
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
