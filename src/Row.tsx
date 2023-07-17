import React from 'react'

import DialogueType from './Row Components/DialogueType';
import Dialogue from './Row Components/Dialogue';
import Speaker from './Row Components/Speaker';
import Emotion from './Row Components/Emotion';
import Position from './Row Components/Position';
import Response from './Row Components/Response';
import Label from './Row Components/Label';

import { Button, Fab } from '@mui/material'
import { Add, DeleteOutline } from '@mui/icons-material'
import { Res, RowProps } from './Row Components/types';
import { Message } from './Row Components/types';

interface RowData {
  dialogueType: string,
  dialogue: string,
  label?: string,
  emotion?: string,
  position?: string,
  speaker?: string,
  next?: string,
  res?: {
    m: string
    level?: number // only show if player meets compatability req
    next: string
  }[]
}

export default function Row({ rowData, id, returnRowData, deleteRow }: RowProps) {
  const [diagType, setDiagType] = React.useState<string>('Dialogue')
  const [diag, setDiag] = React.useState<string>(rowData.m || '')
  const [speaker, setSpeaker] = React.useState<string>('')
  const [emotion, setEmotion] = React.useState<string>(rowData.emotion || 'neutral')
  const [pos, setPos] = React.useState(rowData.pos || 'left')
  const [label, setLabel] = React.useState<string>('')


  // const [resArray, setResArray] = React.useState<{ [id: number]: JSX.Element }>({})
  // const resRef = React.useRef<{ [id: number]: JSX.Element }>({})
  // const resId = React.useRef(0)
  // const addRes = () => {
  //   const resCopy = { ...resRef.current }
  //   resCopy[resId.current += 1] =
  //     <Response
  //       id={resId.current}
  //       resData={{ m: '', next: '' }}
  //       returnResData={(val, id) => setResData(val, id)}
  //       deleteRes={id => deleteRes(id)}
  //     />
  //   resRef.current = { ...resRef.current, ...resCopy }
  //   setResArray(resRef.current)
  //   // setResArray(obj => ({ ...obj, ...resCopy }))
  // }
  // const deleteRes = (id: number) => {
  //   const resCopy = { ...resRef }
  //   console.log("🚀 ~ file: Row.tsx:69 ~ deleteRes ~ resCopy:", resCopy)
  //   // delete resCopy[id]
  //   // console.log("🚀 ~ file: Row.tsx:71 ~ deleteRes ~ id:", id)
  //   // console.log("🚀 ~ file: Row.tsx:71 ~ deleteRes ~ resCopy:", resCopy)
  //   // setResArray(resCopy)

  // }
  // const setResData = (res: Res, id: number) => {
  //   const resCopy = { ...resRef }
  //   resCopy.current[id] =
  //     <Response
  //       id={id}
  //       resData={{ m: res.m, next: res.next }}
  //       returnResData={(val, id) => setResData(val, id)}
  //       deleteRes={id => deleteRes(id)}
  //     />
  //   // setResArray(obj => ({ ...obj, ...resCopy }))
  //   resRef.current = { ...resRef.current, ...resCopy }
  //   setResArray(resRef.current)
  // }
  // console.log("🚀 ~ file: Row.tsx:59 ~ Row ~ resArray:", (resRef))

  const resRef = React.useRef<{ [id: number]: JSX.Element }>({})
  const [resObj, setResObj] = React.useState<{ [id: number]: JSX.Element }>({})
  const resId = React.useRef(0)
  const addRes = () => {
    const resCopy = { ...resRef.current }
    resCopy[resId.current += 1] =
      <Response
        key={`response${resId.current}`}
        id={resId.current}
        resData={{ m: '', next: '' }}
        returnResData={(val, id) => setResData(val, id)}
        deleteRes={id => deleteRes(id)}
      />
    // setResArray(resCopy)
    setResObj(obj => ({ ...obj, ...resCopy }))
    resRef.current = { ...resObj, ...resCopy }
  }
  const setResInRowData = (res: Res, id: number) => {
    const resInRowObj = componentRowData.current.res?.find(res => res.id === id)
    if (!resInRowObj) {
      componentRowData.current.res = [...componentRowData.current.res, { id: id, m: res.m, next: res.next }]
      return
    }
    const resIdx = componentRowData.current.res?.indexOf(resInRowObj)
    if ((resIdx > -1) && componentRowData.current.res) {
      componentRowData.current.res[resIdx] = { id: id, m: res.m, next: res.next }
    }
  }
  const deleteResInRowData = (id: number) => {
    const resObj = componentRowData.current.res?.find(res => res.id === id)
    if (!resObj) {
      return
    }
    const resIdx = componentRowData.current.res?.indexOf(resObj)
    if ((resIdx > -1) && componentRowData.current.res) {
      delete componentRowData.current.res[resIdx]
    }
  }
  const setResData = (res: Res, id: number) => {
    setResInRowData(res, id)
    const resCopy = { ...resRef.current }
    resCopy[id] =
      <Response
        key={`response${id}`}
        id={id}
        resData={{ m: res.m, next: res.next }}
        returnResData={(val, id) => setResData(val, id)}
        deleteRes={id => deleteRes(id)}
      />
    setResObj(obj => ({ ...obj, ...resCopy }))
    resRef.current = { ...resObj, ...resCopy }
    console.log("🚀 ~ file: Row.tsx:133 ~ Row ~ rowData:", componentRowData.current)
  }
  const deleteRes = (id: number) => {
    deleteResInRowData(id)
    const resCopy = { ...resRef.current }
    delete resCopy[id]
    setResObj(resCopy)
    resRef.current = { ...resCopy }
  }

  const componentRowData = React.useRef<Message>({ res: [] })

  React.useEffect(() => {
    if (diagType == 'Narrator') {
      componentRowData.current = {
        m: diag,
        label: label,
        emotion: '',
        char: 'system',
        res: []
      }
      resRef.current = {}
      setResObj({})
    }
    if (diagType == 'Dialogue') {
      componentRowData.current = {
        m: diag,
        label: label,
        emotion: emotion,
        pos: pos,
        char: speaker,
        res: componentRowData.current.res
        // ...rowData.current
      }
    }
    returnRowData(componentRowData.current, id)
    console.log("🚀 ~ file: Row.tsx:133 ~ Row ~ rowData:", componentRowData.current)

  }, [diagType, diag, speaker, emotion, pos, label,])

  return (
    <>
      <div className="row-wrapper">
        <div className='row'>
          <div className="delete-row-btn-wrapper">
            <Fab size='small' onClick={() => deleteRow(id)} className='delete-row-btn hide'>
              <DeleteOutline color='error' />
            </Fab>
          </div>
          <Label handleChange={(value) => setLabel(value)} />
          <DialogueType handleChange={(value) => setDiagType(value)} />
          <Dialogue handleChange={(value) => setDiag(value)} />
          {(diagType == 'Dialogue') && (
            <>
              <Speaker handleChange={(value) => setSpeaker(value)} />
              <Emotion handleChange={(value) => setEmotion(value)} />
              <Position handleChange={(value) => setPos(value)} />
              <div className="add-res-btn-wrapper ">
                <Fab
                  className='add-res-btn hide'
                  size='small'
                  onClick={() => addRes()}
                ><Add /></Fab>
              </div>
            </>
          )}
          {(diagType == 'Narrator') && (
            < div className="add-res-btn-wrapper" />
          )}
        </div >
        {(diagType == 'Dialogue') && (
          <>
            {Object.values(resObj).map(res => (
              res
            ))}
          </>
        )}
      </div >
    </>
  )
}
