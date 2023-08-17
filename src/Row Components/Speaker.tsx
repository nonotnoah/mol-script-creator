import { FormControl, InputLabel, Select, MenuItem, } from '@mui/material'
import { ChangeProps } from '../types'

interface SpeakerProps extends ChangeProps {
  characters: string[]
  variant: "standard" | "outlined" | "filled" | undefined
}

export default function Speaker({ variant, characters, val, handleChange }: SpeakerProps) {
  return (
    <FormControl
      size='small'
      className='speakerOptionWrapper'>
      <InputLabel id="speaker-type">{variant ? '' : 'Speaker'}</InputLabel>
      <Select
        sx={variant ? { bottom: 5 } : {}}
        variant={variant}
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
          char == 'Protagonist' ? variant == 'standard' ? (
            null
          ) : (
            <MenuItem value={char}>{char}</MenuItem>
          ) : (
            <MenuItem value={char}>{char}</MenuItem>
          )
        ))}

      </Select>
    </FormControl>
  )
}
