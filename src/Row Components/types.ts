export interface ChangeProps {
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