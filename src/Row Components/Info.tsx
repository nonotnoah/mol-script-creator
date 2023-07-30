import { Check, CancelOutlined, } from '@mui/icons-material';
import { Box, Fab, Modal, TextField } from '@mui/material'
import React from 'react'
import { InfoType } from '../types';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

interface InfoProps {
  infoProp: InfoType
  sendInfo: (info: InfoType) => void
}

export default function Info({ sendInfo, infoProp }: InfoProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (!open) {
      setOpen(true)
      setInfo({ ...temp.current })
    }
  };
  const handleCloseWithSaving = () => {
    setOpen(false);
    sendInfo(temp.current);
    setInfo({ ...temp.current })
  }
  const handleCloseWithoutSaving = () => { setOpen(false); setInfo(why2) };
  const temp = React.useRef<InfoType>(infoProp)
  const [info, setInfo] = React.useState<InfoType>(infoProp)
  const why2 = infoProp

  return (
    <>
      <div
        className="info"
        onClick={handleOpen}
      >
        <h1>{infoProp.title}</h1>
        <Modal
          open={open}
          onClose={handleCloseWithoutSaving}

        >
          <Box sx={style}>
            <h2 style={{ marginTop: 0 }}>Script Info</h2>
            <div className="info-fields-wrapper" >
              <div className="info-field">
                <TextField sx={{ width: 300 }} defaultValue={info.title} onChange={e => temp.current.title = e.target.value} label='Change Title'></TextField>
              </div>
              <div className="info-field">
                <TextField multiline sx={{ width: 300 }} defaultValue={info.description} onChange={e => temp.current.description = e.target.value} label='Description'></TextField>
              </div>
              <div className="info-field">
                <TextField sx={{ width: 300 }} defaultValue={info.characters} onChange={e => temp.current.characters = e.target.value.split(',')} label='Characters (comma separated)'></TextField>
              </div>
              <div className="info-field">
                <TextField sx={{ width: 300 }} defaultValue={info.locations} onChange={e => temp.current.locations = e.target.value.split(',')} label='Locations (comma separated)'></TextField>
              </div>
              <div className="info-field time-wrapper">
                <TextField sx={{ width: 135 }} defaultValue={info.start} type='number' onChange={e => temp.current.start = parseInt(e.target.value)} label='Start Time (24h)'></TextField>
                <TextField sx={{ width: 135 }} defaultValue={info.end} type='number' onChange={e => temp.current.end = parseInt(e.target.value)} label='End Time (24h)'></TextField>
              </div>
            </div>
            <div className="change-btn-wrapper">
              <Fab onClick={handleCloseWithSaving}><Check></Check></Fab>
              {/* <Fab onClick={() => { handleCloseWithSaving(); setInfo(why) }}><CancelOutlined /></Fab> */}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}
