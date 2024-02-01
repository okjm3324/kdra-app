import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const Modal = ({ open, onClose, children, title }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
       {children}
      </DialogContent>
    </Dialog>
  )
}
export default Modal
