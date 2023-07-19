import React from 'react'

type HM = {
  [idx: number]: string
}

export default function Objtest() {
  const [hm, setHm] = React.useState<HM>({ 1: 'hello world', 2: 'asdf', 3: 'again' })
  const ct = React.useRef(3)
  const add = () => {
    const hmCopy = { ...hm }
    const plus = ct.current += 1
    hmCopy[plus] = 'new'
    setHm({ ...hmCopy })
  }
  const edit = (id: number) => {
    const hmCopy = { ...hm }
    hmCopy[id] = 'edit'
    setHm({ ...hmCopy })
  }
  const del = (id: number) => {
    const hmCopy = { ...hm }
    delete hmCopy[id]
    setHm((hmCopy))
  }
  return (
    <div>
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        {Object.entries(hm).map(entry => (
          <>
            <div style={{ border: '1px solid red', width: '200px', }}>
              <button onClick={() => del(parseInt(entry[0]))}>delete</button>
              <button onClick={() => edit(parseInt(entry[0]))}>edit</button>
              <h3>{entry[0]}</h3>
              <p>{entry[1]}</p>
            </div>
          </>
        ))}
      </div>
      <button onClick={() => add()}>ADD</button>
    </div>
  )
}
