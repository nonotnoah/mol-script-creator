import React from 'react'
import { ChangeProps } from '../types'
import { TextField } from '@mui/material'

export default function Next({ handleChange }: ChangeProps) {
  return (
    <TextField
      size='small'
      label='Next'
      className='next-input'
      onChange={(event) => {
        handleChange(event.target.value)
      }}
    />
  )
}
