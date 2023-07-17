import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ChangeProps } from './types';

export default function DialogueType({ handleChange }: ChangeProps) {
  const [dialogueType, setDialogueType] = React.useState<string>('Dialogue')
  return (
    <FormControl className='dialogue-type'>
      <InputLabel id="dialogue-type">Type</InputLabel>
      <Select
        sx={{height: 40}}
        labelId="dialogue-type"
        id="dialogue-type"
        value={dialogueType}
        label="dialogue-type"
        onChange={(event) => { setDialogueType(event.target.value); handleChange(event.target.value) }}
      >
        <MenuItem value="Dialogue">Dialogue</MenuItem>
        <MenuItem value="Narrator">Narrator</MenuItem>
      </Select>
    </FormControl>
  )
}