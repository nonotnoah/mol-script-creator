import React from 'react'
import { ChangeProps } from './types'
import { TextField } from '@mui/material'

export default function Label({ handleChange }: ChangeProps) {
  return (
    <TextField
      label='Label'
      className='label-input'
      onChange={(event) => {
        handleChange(event.target.value)
      }}
    />
  )
}
