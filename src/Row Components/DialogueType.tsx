import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ChangeProps } from '../types';

export default function DialogueType({ val: initVal, handleChange }: ChangeProps) {
  return (
    <FormControl className='dialogue-type'>
      <InputLabel id="dialogue-type">Type</InputLabel>
      <Select
        sx={{ height: 40 }}
        labelId="dialogue-type"
        id="dialogue-type"
        value={initVal}
        label="dialogue-type"
        onChange={(event) => { handleChange(event.target.value) }}
      >
        <MenuItem value="Dialogue">Dialogue</MenuItem>
        <MenuItem value="Narrator">Narrator</MenuItem>
        <MenuItem value="Text">Text</MenuItem>
        <MenuItem value="End">End Script</MenuItem>
      </Select>
    </FormControl>
  )
}
