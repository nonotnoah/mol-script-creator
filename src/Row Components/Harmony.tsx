import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ChangeProps } from '../types'

export default function Harmony({ val, handleChange }: ChangeProps) {
  return (
    <FormControl variant='standard' size='small' className='harmony-type'>
      <InputLabel id="harmony-type"></InputLabel>
      <Select
        size='small'
        labelId="harmony-type"
        id="harmony-type"
        value={val}
        label="harmony-type"
        onChange={(event) => {
          handleChange(event.target.value)
        }}
      >
        <MenuItem value="increase">Increase</MenuItem>
        <MenuItem value="decrease">Decrease</MenuItem>
      </Select>
    </FormControl>
  )
}
