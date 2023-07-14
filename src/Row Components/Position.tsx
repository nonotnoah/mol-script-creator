import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ChangeProps } from './types'

export default function Position({ handleChange }: ChangeProps) {
  const [positionType, setPositionType] = React.useState<string>('left')
  return (
    <FormControl className='position-type'>
      <InputLabel id="position-type">Position</InputLabel>
      <Select
        labelId="position-type"
        id="position-type"
        value={positionType}
        label="position-type"
        onChange={(event) => {
          setPositionType(event.target.value)
          handleChange(event.target.value)
        }}
      >
        <MenuItem value="left">Left</MenuItem>
        <MenuItem value="right">Right</MenuItem>
      </Select>
    </FormControl>
  )
}
