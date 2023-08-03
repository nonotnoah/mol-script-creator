import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
const maxLength = 150
import { ChangeProps } from '../types';

export default function Dialogue({ val, handleChange }: ChangeProps) {
  const [remainingCharacters, setRemainingCharacters] = React.useState<number>(maxLength)
  const handleRemainingCharacters = (current: number) => {
    setRemainingCharacters(maxLength - current)
  }
  const [multi, setMulti] = React.useState(false)
  const shrink = () => setMulti(false)
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
      value={val}
      onFocus={e => {
        setMulti(true)
        e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
      }}
      onBlur={shrink}
      multiline={multi}
      autoFocus={multi}
      // error={val ? false : true}
      // required
    />
  )
}
