import React from 'react'

import DialogueType from './Row Components/DialogueType';
import Dialogue from './Row Components/Dialogue';
import Speaker from './Row Components/Speaker';
import Emotion from './Row Components/Emotion';
import Position from './Row Components/Position';
import Response from './Row Components/Response';
import Label from './Row Components/Label';

interface RowData {
  dialogueType: string,
  dialogue: string,
  label?: string,
  emotion?: string,
  position?: string,
  speaker?: string,
  next?: string,
  res?: {
    m: string
    level?: number // only show if player meets compatability req
    next: string
  }[]
}
export interface Message {
  m?: string
  q?: string
  char?: string
  label?: string
  next?: string
  res?: {
    m: string
    level?: number // only show if player meets compatability req
    next: string
  }[]
  emotion?: string
  location?: string
  pos?: string
}

export default function Row() {
  const [diagType, setDiagType] = React.useState<string>('Dialogue')
  const [diag, setDiag] = React.useState<string>('')
  const [speaker, setSpeaker] = React.useState<string>('')
  const [emotion, setEmotion] = React.useState<string>('')
  const [pos, setPos] = React.useState('')
  const [label, setLabel] = React.useState<string>('')
  const [res, setRes] = React.useState<string>('')

  const rowData = React.useRef<Message>({})

  React.useEffect(() => {
    if (diagType == 'Narrator') {
      rowData.current = {
        m: diag,
        label: label,
        emotion: '',
        char: 'system',
      }
      return
    }
    rowData.current = {
      m: diag,
      label: label,
      emotion: emotion,
      pos: pos,
      char: speaker
    }


  }, [diagType, diag, speaker, emotion, pos, label])

  return (
    <>
      <div className="row-wrapper">
        <div className='row'>
          <Label handleChange={(value) => setLabel(value)} />
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
        <div className="row">
          <Response />
        </div>
      </div>
    </>
  )
}
