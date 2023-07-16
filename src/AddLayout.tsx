import React from 'react'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'

export default function AddLayout(addRow: () => void, addRes: () => void) {
  return (
    <div className="add-layout-wrapper">
      <div className="add-row-btn">
        <Button
          variant='outlined'
          startIcon={<Add />}
          onClick={() => addRow()}
        >Row</Button>
      </div>
      <div className="add-res-btn">
        <Button
          variant='outlined'
          startIcon={<Add />}
          onClick={() => addRes()}
        >response</Button>
      </div>
    </div>
  )
}
