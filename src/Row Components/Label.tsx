import { ChangeProps } from '../types'
import { TextField } from '@mui/material'
interface FocusProps extends ChangeProps {
  onFocus: (label: string) => void
  onBlur: (label: string) => void
  highlight: boolean | undefined
}

export default function Label({ onBlur, highlight, val: initVal, handleChange, onFocus }: FocusProps) {
  return (
    <TextField
      size='small'
      label={highlight ? 'hello' : 'Next Label'}
      className={`label-input ${highlight ? 'highlight' : ''}`}
      onChange={(event) => {
        handleChange(event.target.value)
      }}
      value={initVal}
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
