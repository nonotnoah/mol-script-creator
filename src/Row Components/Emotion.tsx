import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ChangeProps } from './types';

const emotions = ['Neutral', 'Happy', 'Sad', 'Disgusted', 'Angry', 'Fearful', 'Surprised']

export default function Emotion({ handleChange }: ChangeProps) {
  const [emotionType, setEmotionType] = React.useState<string>('Neutral')
  return (
    <FormControl className='emotion-type'>
      <InputLabel id="emotion-type">Emotion</InputLabel>
      <Select
        labelId="emotion-type"
        id="emotion-type"
        value={emotionType}
        label="emotion-type"
        onChange={(event) => {
          setEmotionType(event.target.value)
          handleChange(event.target.value)
        }}
      >
        {emotions.map(emotion => (
          <MenuItem value={emotion}>{emotion}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
