import { ChangeProps } from '../types'
import { TextField } from '@mui/material'

export default function Next({ val, handleChange }: ChangeProps) {
  return (
    <TextField
      size='small'
      label='Next Label'
      className='next-input'
      onChange={(event) => {
        handleChange(event.target.value)
      }}
      value={val}
      required
    />
  )
}
