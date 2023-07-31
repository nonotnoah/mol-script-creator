import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField } from '@mui/material'
import { ChangeProps } from '../types'

const defaultCharacters = ['Juice', 'Harry']
interface SpeakerProps extends ChangeProps {
  characters: string[]
}

// export default function Speaker({ characters, val, handleChange }: SpeakerProps) {
//   // const [characters, setCharacters] = React.useState(defaultCharacters)
//   // const [charValue, setCharValue] = React.useState<string | null>(null)
//   return (
//     <Autocomplete
//       size='small'
//       className='speakerOptionWrapper'
//       value={val}
//       onChange={(event, value) => {
//         // setCharValue(value);
//         if (!value) {
//           const empty = ''
//           handleChange(empty)
//         } else {
//           handleChange(value)
//         }
//       }}
//       selectOnFocus
//       autoSelect
//       options={characters || []}
//       renderOption={(props, option) => <li {...props}>{option}</li>}
//       renderInput={(params) => (<TextField {...params} label="Speaker" />)}
//       // defaultValue={initVal}
//     />
//   )
// }

export default function Speaker({ characters, val, handleChange }: SpeakerProps) {
  // const [positionType, setPositionType] = React.useState('left')
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
          // setPositionType(event.target.value)
          handleChange(event.target.value)
        }}
      // defaultValue={initVal}
      >
        {characters.map(char => (
          <MenuItem value={char}>{char}</MenuItem>
        ))}

      </Select>
    </FormControl>
  )
}
