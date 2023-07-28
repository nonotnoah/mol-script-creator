import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
const maxLength = 100
import { ChangeProps } from '../types';

export default function Dialogue({ val: initVal, handleChange }: ChangeProps) {
  const [remainingCharacters, setRemainingCharacters] = React.useState<number>(maxLength)
  const handleRemainingCharacters = (current: number) => {
    setRemainingCharacters(maxLength - current)
  }
  return (

    <TextField
    size='small'
    label='Dialogue'
      className='dialogue-input'
      inputProps={{ maxLength: maxLength }}
      onChange={(event) => {
        handleRemainingCharacters(event.target.value.length);
        handleChange(event.target.value)
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            {remainingCharacters}
          </InputAdornment>
        )
      }}
      defaultValue={initVal}
    />
  )
}
