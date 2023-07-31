import React from 'react'
import { Fab, } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { ResProps, ResponseType } from '../types'
import Dialogue from './Dialogue'
import Next from './Next'

export default function Response({ id, resData, returnResData, deleteRes }: ResProps) {
  const [diag, setDiag] = React.useState<string>(resData.m || '')
  const [next, setNext] = React.useState<string>(resData.next || '')

  const componentResData = React.useRef<ResponseType>()

  React.useEffect(() => {
    componentResData.current = {
      id: resData.id,
      m: diag,
      next: next,
    }
    returnResData(componentResData.current, id)
  }, [diag, next, id, resData.id, returnResData])

  return (
    <div className="row">
      <div className='response'>
        <Dialogue val={resData.m || ''} handleChange={(value) => setDiag(value)} />
        <div className="res-spacer"></div>
        <Next val={resData.next || ''} handleChange={(value) => setNext(value)} />
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
