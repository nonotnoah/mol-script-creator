export interface Message {
  // type: 'Dialogue' | 'Narrator'
  type: string
  id: number
  m: string
  char: string
  label: string
  next?: string
  res: ResponseType[]
  emotion: string
  location: string
  pos: string
}

export interface ResponseType {
  id: number
  m: string
  level?: number // only show if player meets compatability req
  next: string
}

export interface ChangeProps {
  val: string,
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
  characters: string[]
  locations: string[]
}

export interface ScriptStore {
  id: string
  script: Message[]
  info: InfoType
}
export interface Store {
  [key: string]: ScriptStore
}
export interface InfoType {
  title: string
  description: string
  start: number
  end: number
  characters: string[]
  locations: string[]
}