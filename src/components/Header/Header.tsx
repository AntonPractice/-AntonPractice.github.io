import React, { FC, useContext } from 'react';
import * as styles from './styles.module.scss';
import { Logo } from '../Logo/Logo';
import { DefaultButton } from '../Button/DefaultButton';
import { ButtonTheme } from '../ButtonTheme/ButtonTheme';
import { ThemeContext } from '../Provider/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { ButtonLang } from '../ButtonLang/ButtonLang';
import { useTokenContext } from 'src/TokenProvider';
import { Link, NavLinkProps } from 'react-router-dom';
import cn from 'clsx';
import Tabs from '@mui/material/Tabs';
import { IconButton, Tab } from '@mui/material';
import { profileSelectors } from 'src/store/profile';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

export const getClassName: NavLinkProps['className'] = ({ isActive }) => {
  if (isActive) {
    return cn(styles.linkActive);
  } else {
    return cn(styles.link);
  }
};

export const Header: FC = () => {
  const [theme] = useContext(ThemeContext);
  const { t } = useTranslation();
  const [, { logout }] = useTokenContext();
  const [value, setValue] = React.useState(+localStorage.getItem('indexTab') || 0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
    localStorage.setItem('indexTab', newValue.toString());
  };
  const profile = useSelector(profileSelectors.get);
  const LoginName = profile && profile[0] ? profile[0]['name'] : '';

  localStorage.setItem('userInfo', JSON.stringify(profile));
  return (
    <header>
      <div className={styles.storybookHeader} style={theme === 'dark' ? { backgroundColor: 'rgb(177, 189, 230)' } : {}}>
        <div>
          <Logo />
          <h1>pRo bOOKS</h1>
        </div>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
          <Tab component={Link} label={t('tabs.prodList')} to="/" />
          <Tab component={Link} label={t('tabs.myProducts')} to="/mybooks" />
          <Tab component={Link} label={t('tabs.basket')} to="/other" />
          <Tab component={Link} label={t('tabs.orders')} to="/orders" />
          <Tab component={Link} label={t('tabs.profile')} to="/ProfileScreen" />
        </Tabs>
        <div>
          <>
            <span className={styles.welcome}>{LoginName}</span>
            {LoginName ? (
              <IconButton onClick={logout}>
                <LogoutIcon />
              </IconButton>
            ) : (
              <Link to="/auth">
                <DefaultButton label={'Войти'} />
              </Link>
            )}
            <ButtonTheme />
            <ButtonLang />
          </>
        </div>
      </div>
    </header>
  );
};
