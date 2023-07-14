import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { ChangeProps } from './types'

const defaultCharacters = ['Juice', 'Harry']

export default function Speaker({ handleChange }: ChangeProps) {
  const [characters, setCharacters] = React.useState(defaultCharacters)
  const [charValue, setCharValue] = React.useState<string | null>(null)
  return (
    <Autocomplete
      className='speakerOptionWrapper'
      value={charValue}
      onChange={(event, value) => {
        setCharValue(value);
        if (!value) {
          const empty = ''
          handleChange(empty)
        } else {
          handleChange(value)
        }
      }}
      selectOnFocus
      autoSelect
      options={characters}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      renderInput={(params) => (<TextField {...params} label="Speaker" />)}
    />
  )
}
