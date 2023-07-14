import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import DialogueType from './Row Components/DialogueType';
import Dialogue from './Row Components/Dialogue';
import Speaker from './Row Components/Speaker';
import Emotion from './Row Components/Emotion';
import Position from './Row Components/Position';

export default function Row() {

  const [diagType, setDiagType] = React.useState<string>('Dialogue')
  const [diag, setDiag] = React.useState<string>()
  const [speaker, setSpeaker] = React.useState<string>()
  const [emotion, setEmotion] = React.useState<string>()
  const [pos, setPos] = React.useState<string>()

  return (
    <>
      <div className='row'>
        <DialogueType handleChange={(value) => setDiagType(value)} />
        <Dialogue handleChange={(value) => setDiag(value)} />
        {(diagType == 'Dialogue') && (
          <>
            <Speaker handleChange={(value) => setSpeaker(value)} />
            <Emotion handleChange={(value) => setEmotion(value)} />
            <Position handleChange={(value) => setPos(value)} />
          </>
        )}
      </div >
    </>
  )
}
