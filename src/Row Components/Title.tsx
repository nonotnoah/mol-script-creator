import { Check, CancelOutlined, } from '@mui/icons-material';
import { Box, Fab, Modal, TextField } from '@mui/material'
import React from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface TitleProps {
  titleProp: string
  sendTitle: (title: string) => void
}

export default function Title({ sendTitle, titleProp }: TitleProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { if (!open) setOpen(true) };
  const handleClose = () => setOpen(false);
  const temp = React.useRef('')

  return (
    <>
      <div
        className="title-wrapper"
        onClick={handleOpen}
      >
        <div className="title">
          <h1>{titleProp}</h1>
          <Modal

            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <TextField defaultValue={titleProp} onChange={e => temp.current = e.target.value} sx={{ paddingRight: 4 }} label='Change Title'></TextField>
              <Fab onClick={() => { handleClose(); sendTitle(temp.current) }} sx={{ marginRight: 4 }}><Check></Check></Fab>
              <Fab onClick={() => { handleClose(); temp.current = '' }}><CancelOutlined /></Fab>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  )
}
