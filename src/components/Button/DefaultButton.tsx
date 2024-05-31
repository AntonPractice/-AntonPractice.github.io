import React, { FC, ReactNode, useContext } from 'react';
import * as styles from './styles.module.scss';
import { ThemeContext } from '../Provider/ThemeProvider';
import { Button } from '@mui/material';

interface ButtonProps {
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export const DefaultButton: FC<ButtonProps> = ({ label, onClick, disabled, children, type }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div>
      <Button
        className={theme === 'dark' ? styles.storyDark : styles.story}
        onClick={onClick && onClick}
        disabled={disabled}
        type={type}
      >
        {children || label}
      </Button>
    </div>
  );
};
