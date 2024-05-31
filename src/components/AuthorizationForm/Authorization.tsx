import React, { useState } from 'react';

import { AuthorizationForm } from './AuthorizationForm';
import { RegistrationForm } from './RegistrationForm';
import { Box, Tab, Tabs } from '@mui/material';

export const Authorization = () => {
  const [autorization, setAutorization] = useState<boolean>(true);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setAutorization((previousValue) => !previousValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Авторизация" />
          <Tab label="Регистрация" />
        </Tabs>
        {autorization ? <AuthorizationForm /> : <RegistrationForm />}
      </Box>
    </>
  );
};
