import { Check, Folder } from '@mui/icons-material'
import { Box, Fab, Modal, TextField, Tooltip } from '@mui/material'
import React from 'react'

interface LoaderProps {
  code: string
  sendCode: (code: string) => void
}
export default function Loader({ code, sendCode }: LoaderProps) {
  const [loader, showLoader] = React.useState(false)
  const displayedCode = React.useRef(code)
  const [json, setJson] = React.useState(code)
  const handleCloseWithSaving = () => {
    showLoader(false);
    sendCode(json)
    displayedCode.current = json
  }
  const handleCloseWithoutSaving = () => {
    console.log('without saving')
    showLoader(false);
    setJson(displayedCode.current)
  };
  const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <div className="load-btn-wrapper">
        <div className="load-btn">
          <Tooltip title={'Load Script'}>
            <Fab onClick={() => showLoader(true)}><Folder /></Fab>
          </Tooltip>
        </div>
        <Modal
          open={loader}
          onClose={handleCloseWithoutSaving}

        >
          <Box sx={style}>
            <TextField
              multiline
              onFocus={event => {
                event.target.select();
              }}
              inputProps={{
                style: {
                  height: 287,
                },
              }}
              sx={{ width: 600 }}
              value={json}
              onChange={e => setJson(e.target.value)}
              label='Code'
            >

            </TextField>
            <div className="" style={{ paddingTop: '10px' }}>
              <Fab onClick={handleCloseWithSaving}><Check></Check></Fab>
              {/* <Fab onClick={() => { handleCloseWithSaving(); setInfo(why) }}><CancelOutlined /></Fab> */}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}
