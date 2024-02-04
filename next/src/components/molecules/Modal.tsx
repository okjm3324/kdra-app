import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import React, { ReactNode, FC } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

const Modal: FC<ModalProps> = ({ open, onClose, children, title }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
export default Modal
