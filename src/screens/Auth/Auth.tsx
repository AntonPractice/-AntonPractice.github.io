import React, { FC } from 'react';
import { useTokenContext } from 'src/TokenProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationState } from 'src/navigation/types';
import { Frame } from 'src/components/Frame';
import * as styles from './styles.module.scss';
import { Button } from 'src/components/Button/Button';
import { AuthorizationForm } from 'src/components/AuthorizationForm/AuthorizationForm';

const Auth: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, { login }] = useTokenContext();
  const onClick = () => {
    
  };
  return (
    <div className={styles.root}>
      <Frame>
        <AuthorizationForm/>
      </Frame>
    </div>
  );
};

export default Auth;
