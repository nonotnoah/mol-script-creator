import React from 'react'

import DialogueType from './DialogueType';
import Dialogue from './Dialogue';
import Speaker from './Speaker';
import Emotion from './Emotion';
import Position from './Position';
import Response from './Response';
import Label from './Label';
import Location from './Location';

import { Fab, IconButton } from '@mui/material'
import { Add, DeleteOutline } from '@mui/icons-material'
import { ResponseType, RowProps } from '../types';
import { Message } from '../types';

const getResObj = (res: ResponseType[]) => {
  const obj: { [id: number]: ResponseType } = {}
  for (let i = 0; i < res.length; i++) {
    obj[res[i].id] = res[i]
  }
  return obj
}
export default function Row({ rowData, id, returnRowData, deleteRow, characters, locations }: RowProps) {
  console.log("🚀 ~ file: Row.tsx:26 ~ Row ~ rowData:", rowData)
  const rowDataRef = React.useRef<Message>(rowData)
  const [rowDataState, setRowDataState] = React.useState<Message>(rowData)
  const editRowData = (key: keyof Message, val: string | number) => {
    rowDataRef.current[key] = val as never // what the fuck
    setRowDataState({ ...rowDataRef.current })
    returnRowData(rowDataRef.current, id)
    console.log('updated', key, 'to', val)
  }

  const resRef = React.useRef<{ [id: number]: ResponseType }>(getResObj(rowData.res))
  const [resObj, setResObj] = React.useState<{ [id: number]: ResponseType }>(getResObj(rowData.res))
  const resId = React.useRef(rowData.res.length)

  const addRes = () => {
    const id = resId.current += 1
    const newRes: ResponseType = { id: id, m: '', next: '' }
    console.log("🚀 ~ file: Row.tsx:61 ~ addRes ~ resId.current:", resId.current)
    resRef.current[id] = newRes
    setResObj({ ...resRef.current })
    rowDataRef.current['res'] = [...Object.values(resRef.current)]
  }
  const editRes = (res: ResponseType, id: number) => {
    resRef.current[id] = res
    setResObj({ ...resRef.current })
    rowDataRef.current['res'] = [...Object.values(resRef.current)]
  }
  const deleteRes = (id: number) => {
    delete resRef.current[id]
    if (Object.keys(resRef.current).length == 0) {
      resRef.current = {}
      setResObj({})
      rowDataRef.current['res'] = []
      return
    }
    setResObj({ ...resRef.current })
    rowDataRef.current['res'] = [...Object.values(resRef.current)]
  }

  return (
    <>
      <div className='row' key={`row${rowData.id}`}>
        <DialogueType val={rowData.type} handleChange={(value) => editRowData('type', value)} />
        <Dialogue val={rowData.m} handleChange={(value) => editRowData('m', value)} />
        {(rowDataState.type == 'Dialogue') && (
          <>
            <IconButton
              className='add-res-btn'
              onClick={() => addRes()}
            ><Add /></IconButton>
            <Speaker characters={characters} val={rowData.char} handleChange={(value) => editRowData('char', value)} />
            <Emotion val={rowData.emotion} handleChange={(value) => editRowData('emotion', value)} />
            <Position val={rowData.pos} handleChange={(value) => editRowData('pos', value)} />
          </>
        )}
        <Location locations={locations} val={rowData.location} handleChange={(value) => editRowData('location', value)} />
        <Label val={rowData.label} handleChange={(value) => editRowData('label', value)} />
        <div className="delete-row-btn-wrapper">
          <Fab size='small' onClick={() => deleteRow(id)} className='delete-row-btn hide'>
            <DeleteOutline color='error' />
          </Fab>
        </div>
      </div >
      {(rowDataState.type == 'Dialogue') && (
        <>
          {Object.values(resObj).map(res => (
            <Response
              key={`response${res.id}`}
              id={res.id}
              resData={res}
              returnResData={(val, id) => editRes(val, id)}
              deleteRes={id => deleteRes(id)}
            />
          ))}
        </>
      )}
    </>
  )
}
