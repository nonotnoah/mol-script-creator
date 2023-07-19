import React from 'react'

export default function ScriptPicker() {
  const [storedScripts, setStoredScripts] = React.useState(localStorage.getItem('scripts'))
  return (
    <div className="picker-wrapper">

    </div>
  )
}
