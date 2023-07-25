import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ChangeProps } from '../types';

const emotions = ['neutral', 'happy', 'sad', 'disgusted', 'angry', 'fearful', 'surprised']

export default function Emotion({ initVal, handleChange }: ChangeProps) {
  // const [emotionType, setEmotionType] = React.useState<string>('neutral')
  return (
    <FormControl className='emotion-type'>
      <InputLabel id="emotion-type">Emotion</InputLabel>
      <Select
        size='small'
        labelId="emotion-type"
        id="emotion-type"
        value={initVal}
        label="emotion-type"
        onChange={(event) => {
          // setEmotionType(event.target.value)
          handleChange(event.target.value)
        }}
        // defaultValue={initVal}
      >
        {emotions.map((emotion) => (
          <MenuItem key={emotion} value={emotion}>{titleCase(emotion)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const titleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1)
}