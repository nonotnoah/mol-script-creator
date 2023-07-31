import { Autocomplete, TextField } from '@mui/material'
import { ChangeProps } from '../types'

interface LocProps extends ChangeProps {
  locations: string[]
}

export default function Location({ locations, val, handleChange }: LocProps) {
  return (
    <Autocomplete
      size='small'
      className='location-type'
      value={val}
      onChange={(_event, value) => {
        if (!value) {
          const empty = ''
          handleChange(empty)
        } else {
          handleChange(value)
        }
      }}
      options={locations}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      renderInput={(params) => (<TextField {...params} label="Location" />)}
    />
  )
}