import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ChangeProps } from '../types'

export default function Position({ val: initVal, handleChange }: ChangeProps) {
  return (
    <FormControl size='small' className='position-type'>
      <InputLabel id="position-type">Position</InputLabel>
      <Select
        size='small'
        labelId="position-type"
        id="position-type"
        value={initVal}
        label="position-type"
        onChange={(event) => {
          handleChange(event.target.value)
        }}
      >
        <MenuItem value="left">Left</MenuItem>
        <MenuItem value="right">Right</MenuItem>
      </Select>
    </FormControl>
  )
}
