import React from 'react'
import { Button, Fab, TextField } from '@mui/material'
import { DeleteForeverOutlined, DeleteOutline } from '@mui/icons-material'
import { ChangeProps, Res, ResProps } from '../types'
import Dialogue from './Dialogue'
import Next from './Next'
import Label from './Label'

export default function Response({ id, resData, returnResData, deleteRes }: ResProps) {
  const [diag, setDiag] = React.useState<string>(resData.m)
  const [next, setNext] = React.useState<string>(resData.next)

  const componentResData = React.useRef<Res>()

  React.useEffect(() => {
    componentResData.current = {
      m: diag,
      next: next,
    }
    returnResData(componentResData.current, id)
  }, [diag, next])

  return (
    <div className="row">
      <div className='response'>
        <div className="left-padding" />
        <div className="delete-row-btn-wrapper">
          <Fab size='small' onClick={() => deleteRes(id)} className='delete-row-btn hide'>
            <DeleteOutline color='error' />
          </Fab>
        </div>
        <div className="id">{`${id}.`}</div>
        <Dialogue handleChange={(value) => setDiag(value)} />
        <Next handleChange={(value) => setNext(value)} />
        <div className="right-padding" />
      </div>
    </div>
  )
}
