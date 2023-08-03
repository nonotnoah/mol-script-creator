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

export default function Row({
  rowData,
  id,
  returnRowData,
  deleteRow,
  characters,
  locations
}: RowProps) {
  console.log("🚀 ~ file: Row.tsx:26 ~ Row ~ rowData:", rowData)
  const rowDataRef = React.useRef<Message>(rowData)
  const [rowDataState, setRowDataState] = React.useState<Message>(rowData)
  const editRowData = (key: keyof Message, val: string | number | ResponseType[]) => {
    rowDataRef.current[key] = val as never // what the fuck
    setRowDataState({ ...rowDataRef.current })
    returnRowData(rowDataRef.current, id)
    console.log('updated', key, 'to', val)
  }

  const resRef = React.useRef<ResponseType[]>(rowData.res)
  const resId = React.useRef(rowData.res.length)

  const addRes = () => {
    const id = resId.current += 1
    const newRes: ResponseType = { id: id, m: '', next: '' }
    console.log("🚀 ~ file: Row.tsx:61 ~ addRes ~ resId.current:", resId.current)
    resRef.current.push(newRes)
    editRowData('res', [...resRef.current])
  }
  const editRes = (newRes: ResponseType, id: number) => {
    const resIdx = resRef.current.findIndex(res => res.id === id)
    if (resIdx > -1) resRef.current.splice(resIdx, 1, newRes)
    editRowData('res', [...resRef.current])
    console.log('edit res')
  }
  const deleteRes = (id: number) => {
    const resIdx = resRef.current.findIndex(res => res.id === id)
    if (resIdx > -1) resRef.current.splice(resIdx, 1)
    editRowData('res', [...resRef.current])
    if (Object.keys(resRef.current).length == 0) {
      resRef.current = []
      rowDataRef.current['res'] = []
      return
    }
  }

  if (rowDataState.type == 'End') {
    return (
      <div className='row' key={`row${rowData.id}`}>
        <DialogueType val={rowData.type} handleChange={(value) => editRowData('type', value)} />
        <div className="end-spacer" style={
          {
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px dashed red',
            flex: 1,
            height: 36,
            // background: 'white'
          }}>
        </div>
        <div className="delete-row-btn-wrapper">
          <Fab size='small' onClick={() => deleteRow(id)} className='delete-row-btn hide'>
            <DeleteOutline color='error' />
          </Fab>
        </div>
      </div>
    )
  }

  if (rowDataState.type == 'Dialogue') {
    return (
      <>
        <div className='row' key={`row${rowData.id}`}>
          <DialogueType val={rowData.type} handleChange={(value) => editRowData('type', value)} />
          <Dialogue val={rowData.m} handleChange={(value) => editRowData('m', value)} />
          <IconButton
            className='add-res-btn'
            onClick={() => addRes()}
          ><Add /></IconButton>
          <Speaker characters={characters} val={rowData.char} handleChange={(value) => editRowData('char', value)} />
          <Emotion val={rowData.emotion} handleChange={(value) => editRowData('emotion', value)} />
          <Position val={rowData.pos} handleChange={(value) => editRowData('pos', value)} />
          <Location locations={locations} val={rowData.location} handleChange={(value) => editRowData('location', value)} />
          <Label val={rowData.label} handleChange={(value) => editRowData('label', value)} />
          <div className="delete-row-btn-wrapper">
            <Fab size='small' onClick={() => deleteRow(id)} className='delete-row-btn hide'>
              <DeleteOutline color='error' />
            </Fab>
          </div>
        </div >
        {rowData.res.map(res => (
          <Response
            key={`response${res.id}`}
            id={res.id}
            resData={res}
            returnResData={(val, id) => editRes(val, id)}
            deleteRes={id => deleteRes(id)}
          />
        ))}
      </>
    )
  }

  if (rowDataState.type == 'Narrator') {
    return (
      <>
        <div className='row' key={`row${rowData.id}`}>
          <DialogueType val={rowData.type} handleChange={(value) => editRowData('type', value)} />
          <Dialogue val={rowData.m} handleChange={(value) => editRowData('m', value)} />
          <Location locations={locations} val={rowData.location} handleChange={(value) => editRowData('location', value)} />
          <Label val={rowData.label} handleChange={(value) => editRowData('label', value)} />
          <div className="delete-row-btn-wrapper">
            <Fab size='small' onClick={() => deleteRow(id)} className='delete-row-btn hide'>
              <DeleteOutline color='error' />
            </Fab>
          </div>
        </div >
        {rowData.res.map(res => (
          <Response
            key={`response${res.id}`}
            id={res.id}
            resData={res}
            returnResData={(val, id) => editRes(val, id)}
            deleteRes={id => deleteRes(id)}
          />
        ))}
      </>
    )
  }

  if (rowDataState.type == 'Text') {
    return (
      <>
        <div className='row' key={`row${rowData.id}`}>
          <DialogueType val={rowData.type} handleChange={(value) => editRowData('type', value)} />
          <Dialogue val={rowData.m} handleChange={(value) => editRowData('m', value)} />
          <IconButton
            className='add-res-btn'
            onClick={() => addRes()}
          ><Add /></IconButton>
          <Speaker characters={characters} val={rowData.char} handleChange={(value) => editRowData('char', value)} />
          <Label val={rowData.label} handleChange={(value) => editRowData('label', value)} />
          <div className="delete-row-btn-wrapper">
            <Fab size='small' onClick={() => deleteRow(id)} className='delete-row-btn hide'>
              <DeleteOutline color='error' />
            </Fab>
          </div>
        </div >
        {rowData.res.map(res => (
          <Response
            key={`response${res.id}`}
            id={res.id}
            resData={res}
            returnResData={(val, id) => editRes(val, id)}
            deleteRes={id => deleteRes(id)}
          />
        ))}
      </>
    )
  }
}
