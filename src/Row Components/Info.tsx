import { Check,  } from '@mui/icons-material';
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
    sendInfo(info);
    temp.current = { ...info }
    // setInfo({ ...temp.current })
  }
  const handleCloseWithoutSaving = () => {
    console.log('without saving')
    setOpen(false);
    setInfo({ ...temp.current })
  };
  const temp = React.useRef<InfoType>(infoProp)
  const [info, setInfo] = React.useState<InfoType>(infoProp)

  return (
    <>
      <div
        className="info"
        onClick={handleOpen}
      >
        <h1>{infoProp.title}</h1>
        <div className="stats">
          <table>
            <tr>
              <td>Locations</td>
              <td>{infoProp.locations}</td>
            </tr>
            <tr>
              <td>Characters</td>
              <td>{infoProp.characters}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{infoProp.description}</td>
            </tr>
          </table>
          {/* <p>Locations: </p>
          <p>Characters: {infoProp.characters}</p>
          <p>Description: {infoProp.description}</p>
          <p>{infoProp.start} - {infoProp.end}</p> */}
        </div>
        <Modal
          open={open}
          onClose={handleCloseWithoutSaving}

        >
          <Box sx={style}>
            <h2 style={{ marginTop: 0 }}>Script Info</h2>
            <div className="info-fields-wrapper" >
              <div className="info-field">
                <TextField
                  sx={{ width: 300 }}
                  value={info.title}
                  onChange={e => {
                    // temp.current.title = e.target.value;
                    setInfo({ ...info, title: e.target.value })
                  }}
                  label='Change Title'></TextField>
              </div>
              <div className="info-field">
                <TextField multiline
                  sx={{ width: 300 }}
                  value={info.description}
                  onChange={e => {
                    // temp.current.description = e.target.value;
                    setInfo({ ...info, description: e.target.value })
                  }}
                  label='Description'></TextField>
              </div>
              <div className="info-field">
                <TextField
                  sx={{ width: 300 }}
                  value={info.characters}
                  onChange={e => {
                    // temp.current.characters = e.target.value.split(',');
                    setInfo({ ...info, characters: e.target.value.split(',') })
                  }}
                  label='Characters (comma separated)'></TextField>
              </div>
              <div className="info-field">
                <TextField
                  sx={{ width: 300 }}
                  value={info.locations}
                  onChange={e => {
                    // temp.current.locations = e.target.value.split(',');
                    setInfo({ ...info, locations: e.target.value.split(',') })
                  }}
                  label='Locations (comma separated)'></TextField>
              </div>
              <div className="info-field time-wrapper">
                <TextField
                  sx={{ width: 145 }}
                  value={info.start} type='number'
                  onChange={e => {
                    // temp.current.start = parseInt(e.target.value);
                    setInfo({ ...info, start: parseInt(e.target.value) })
                  }}
                  label='Start Time (24h)'></TextField>
                <TextField
                  sx={{ width: 145 }}
                  value={info.end} type='number'
                  onChange={e => {
                    // temp.current.end = parseInt(e.target.value);
                    setInfo({ ...info, end: parseInt(e.target.value) })
                  }}
                  label='End Time (24h)'></TextField>
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
