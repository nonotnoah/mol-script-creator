import { TextField } from '@mui/material'
import { ChangeProps } from '../types'

export default function HarmonyAmount({ val, handleChange }: ChangeProps) {
  return (
    <div className="harmony-amount-type">
      <TextField
        sx={{ bottom: -4 }}
        variant='standard'
        size='small'
        value={val}
        type='number'
        onChange={e => {
          handleChange(e.target.value)
        }}
      />
    </div>

  )
}
