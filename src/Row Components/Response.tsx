import React from 'react'
import { Fab, } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { ResProps, ResponseType } from '../types'
import Dialogue from './Dialogue'
import Next from './Next'

export default function Response({ highlight, id, resData, returnResData, deleteRes, onLabelBlur, onLabelFocus }: ResProps) {
  const componentResData = React.useRef<ResponseType>(resData)

  const editResData = (key: keyof ResponseType, val: string) => {
    componentResData.current[key] = val as never // what the fuck
    returnResData(componentResData.current, id)
    // console.log('updated', key, 'to', val)
  }

  return (
    <div className="row">
      <div className='response'>
        <Dialogue val={resData.m || ''} handleChange={(value) => editResData('m', value)} />
        <div className="res-spacer"></div>
        <Next highlight={highlight} onFocus={(label) => onLabelFocus(label)} onBlur={(label) => onLabelBlur(label)} val={resData.next || ''} handleChange={(value) => editResData('next', value)} />
        <div className="delete-row-btn-wrapper">
          <Fab size='small' onClick={() => deleteRes(id)} className='delete-row-btn hide'>
            <DeleteOutline color='error' />
          </Fab>
        </div>
        <div className="res-spacer-right"></div>
      </div>
    </div>
  )
}
