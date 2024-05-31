import React, { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export interface IModal {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: FC<IModal> = ({ visible, onClose, children }) => {
  if (!visible) return null;
  return (
    <>
      <Dialog open={visible} onClose={onClose}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
