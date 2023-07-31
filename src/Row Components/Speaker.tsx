import { FormControl, InputLabel, Select, MenuItem, } from '@mui/material'
import { ChangeProps } from '../types'

interface SpeakerProps extends ChangeProps {
  characters: string[]
}

export default function Speaker({ characters, val, handleChange }: SpeakerProps) {
  return (
    <FormControl
      size='small'
      className='speakerOptionWrapper'>
      <InputLabel id="speaker-type">Speaker</InputLabel>
      <Select
        size='small'
        labelId="speaker-type"
        id="speaker-type"
        value={val}
        label="speaker-type"
        onChange={(event) => {
          handleChange(event.target.value)
        }}
      >
        {characters.map(char => (
          <MenuItem value={char}>{char}</MenuItem>
        ))}

      </Select>
    </FormControl>
  )
}
