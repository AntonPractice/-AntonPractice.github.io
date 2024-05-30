import { TextField, TextFieldProps } from '@mui/material';
import React, { forwardRef } from 'react';

export const FormInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return <TextField variant="outlined" margin="normal" inputRef={ref} fullWidth {...props} />;
});
