import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ChangeProps } from '../types'

export default function Position({ initVal, handleChange }: ChangeProps) {
  // const [positionType, setPositionType] = React.useState('left')
  return (
    <FormControl className='position-type'>
      <InputLabel id="position-type">Position</InputLabel>
      <Select
        size='small'
        labelId="position-type"
        id="position-type"
        value={initVal}
        label="position-type"
        onChange={(event) => {
          // setPositionType(event.target.value)
          handleChange(event.target.value)
        }}
        // defaultValue={initVal}
      >
        <MenuItem value="left">Left</MenuItem>
        <MenuItem value="right">Right</MenuItem>
      </Select>
    </FormControl>
  )
}
