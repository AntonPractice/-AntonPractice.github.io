import React, { FC, useContext, useState } from 'react';
import * as styles from './styles.module.scss';
import { ThemeContext } from '../Provider/ThemeProvider';
import { useTranslation } from 'react-i18next';

interface ButtonProps {

  size?: string;
  label: string;
  onClick?:() => void;
}

export const Button: FC<ButtonProps> = ({ size, label,  onClick, ...props }) => {
  const [theme, ] = useContext(ThemeContext) ;
  const { t } = useTranslation()

  const onClickDefault = () => {
    alert(t(`button.alertText`))
  };

  return (
    <div>
      <button
        type="button"
        className={theme === 'dark'? styles.storyDark :styles.story}
        onClick={onClick ? onClick:onClickDefault}
        {...props}
      >
        {label}
      </button>
    </div>
  );
};
