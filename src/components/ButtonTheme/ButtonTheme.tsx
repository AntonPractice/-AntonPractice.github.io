import React, { FC, useContext } from 'react';
import * as styles from './styles.module.scss';
import { ThemeContext } from '../Provider/ThemeProvider';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ButtonTheme: FC = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <div style={{ display: 'flex' }}>
      {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
      <FormGroup style={{ paddingLeft: 10 }}>
        <FormControlLabel
          className={theme === 'dark' ? styles.storyDark : styles.story}
          control={<Switch onChange={toggleTheme} defaultChecked />}
          label=""
        />
      </FormGroup>
    </div>
  );
};
