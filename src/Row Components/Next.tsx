import { ChangeProps } from '../types'
import { TextField } from '@mui/material'
interface FocusProps extends ChangeProps {
  onFocus: (label: string) => void
  onBlur: (label: string) => void
  highlight: boolean | undefined
}

export default function Next({ onBlur, highlight, onFocus, val, handleChange }: FocusProps) {
  return (
    <TextField
      size='small'
      label='Next Label'
      className={`next-input ${highlight ? 'highlight' : ''}`}
      onChange={(event) => {
        handleChange(event.target.value)
      }}
      value={val}
      required
      color={highlight ? 'success' : 'primary'}
      onFocus={(e) => {
        onFocus(e.target.value)
        // console.log('FOCUSED')
      }}
      onBlur={(e => {
        onBlur(e.target.value)
      })}
    />
  )
}
