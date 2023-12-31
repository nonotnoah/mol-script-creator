import { ChangeProps } from '../types'
import { TextField } from '@mui/material'

export default function Label({ val: initVal, handleChange }: ChangeProps) {
  return (
    <TextField
      size='small'
      label='Label'
      className='label-input'
      onChange={(event) => {
        handleChange(event.target.value)
      }}
      value={initVal}
    />
  )
}
