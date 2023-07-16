import React from 'react'
import { Button, TextField } from '@mui/material'
import { DeleteForeverOutlined, DeleteOutline } from '@mui/icons-material'
import { ChangeProps, Res, ResProps } from './types'
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
        <div className="padding" />
        <div className="id">{id}</div>
        <Dialogue handleChange={(value) => setDiag(value)} />
        <Next handleChange={(value) => setNext(value)} />
        <div className="delete-wrapper">
          <Button onClick={() => deleteRes(id)} className={'delete-btn'}>
            <DeleteOutline color='error' />
          </Button>
        </div>
      </div>
    </div>
  )
}
