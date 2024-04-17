import React, { FC, useContext } from 'react';
import * as styles from './styles.module.scss';
import { Logo } from '../Logo/Logo';
import { Button } from '../Button/Button';
import { ButtonTheme } from '../ButtonTheme/ButtonTheme';
import { ThemeContext } from '../Provider/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { ButtonLang } from '../ButtonLang/ButtonLang';
import { useTokenContext } from 'src/TokenProvider';
import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'clsx';

interface HeaderProps {
  size?: string;
}

export const getClassName: NavLinkProps['className'] = ({ isActive }) =>{
  if(isActive){
   return cn(styles.linkActive)
  }else{
    return cn(styles.link)

  }

};

export const Header: FC<HeaderProps> = ({ size, ...props }) => {
  const [theme, ] = useContext(ThemeContext) ;
  const { t } = useTranslation()
  const [, { logout }] = useTokenContext();

  return (
    <header>
      <div className={styles.storybookHeader} style={theme === 'dark'?{backgroundColor: 'rgb(177, 189, 230)'}:{}}>
        <div>
          <Logo/>
          <h1>Antoneus Project</h1>
        </div>
        <div>
          <NavLink className={getClassName} to="/">
            Список товаров
          </NavLink>
          <NavLink className={getClassName} to="/other">
            Корзина
          </NavLink>
          <NavLink className={getClassName} to="/ProfileScreen">
            Профиль
          </NavLink>
        </div>
        <div>
          <>
            <span className={styles.welcome}>
            {t('header.welcome')}
            </span>
            <Button size="small"  label="Log out" onClick={logout} />
            <ButtonTheme/>
            <ButtonLang/>
          </>
        </div>
      </div>
    </header>
  );
};
