export interface Message {
  type: 'Dialogue' | 'Narrator'
  id: number
  m: string
  q?: string
  char: string
  label: string
  next?: string
  res: ResponseType[]
  emotion: string
  location?: string
  pos: string
}

export interface ResponseType {
  id: number
  m: string
  level?: number // only show if player meets compatability req
  next: string
}

export interface ChangeProps {
  initVal: string,
  handleChange: (val: string) => void
}

export interface ResProps {
  resData: ResponseType
  id: number
  returnResData: (res: ResponseType, id: number) => void
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