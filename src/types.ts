export interface Message {
  type: 'Dialogue' | 'Narrator'
  id: number
  m: string
  q?: string
  char: string
  label: string
  next?: string
  res: {
    id: number
    m: string
    level?: number // only show if player meets compatability req
    next: string
  }[]
  emotion: string
  location?: string
  pos: string
}

export interface ChangeProps {
  initVal: string,
  handleChange: (val: string) => void
}

export interface Res {
  m: string
  level?: number // only show if player meets compatability req
  next: string
}

export interface ResProps {
  resData: { m: string, next: string }
  id: number
  returnResData: (res: Res, id: number) => void
  deleteRes: (id: number) => void
}

interface RowWithId extends Message {
  id: number
}
export interface RowProps {
  rowData: Message
  id: number
  returnRowData: (row: Message, id: number) => void
  deleteRow: (id: number) => void
}

export interface ScriptStore {
  id: string
  script: Message[]
  title: string
}
export interface Store {
  [key: string]: ScriptStore
}