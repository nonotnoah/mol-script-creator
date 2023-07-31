import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField } from '@mui/material'
import { ChangeProps } from '../types'

interface LocProps extends ChangeProps {
  locations: string[]
}
// export default function Location({ locations, val, handleChange }: LocProps) {
//   // const [positionType, setPositionType] = React.useState('left')
//   return (
//     <FormControl
//       size='small'
//       className='location-type'>
//       <InputLabel id="location-type">Location</InputLabel>
//       <Select
//         size='small'
//         labelId="location-type"
//         id="location-type"
//         value={val}
//         label="location-type"
//         onChange={(event) => {
//           // setPositionType(event.target.value)
//           handleChange(event.target.value)
//         }}
//       // defaultValue={initVal}
//       >
//         {locations.map(location => (
//           <MenuItem value={location}>{location}</MenuItem>
//         ))}

//       </Select>
//     </FormControl>
//   )
// }

export default function Location({ locations, val, handleChange }: LocProps) {
  // const [characters, setCharacters] = React.useState(defaultCharacters)
  // const [charValue, setCharValue] = React.useState<string | null>(null)
  return (
    <Autocomplete
      size='small'
      className='location-type'
      value={val}
      onChange={(event, value) => {
        // setCharValue(value);
        if (!value) {
          const empty = ''
          handleChange(empty)
        } else {
          handleChange(value)
        }
      }}
      // selectOnFocus
      // autoSelect
      options={locations}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      renderInput={(params) => (<TextField {...params} label="Location" />)}
      // defaultValue={initVal}
    />
  )
}