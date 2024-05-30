import React, { FC } from 'react';
import { Frame } from 'src/components/Frame';
import * as styles from './styles.module.scss';
import { Authorization } from 'src/components/AuthorizationForm/Authorization';

const Auth: FC = () => {
  return (
    <div className={styles.root}>
      <Frame>
        <Authorization />
      </Frame>
    </div>
  );
};

export default Auth;
