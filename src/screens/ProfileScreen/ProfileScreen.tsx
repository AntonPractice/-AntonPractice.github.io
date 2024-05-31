import React, { FC } from 'react';
import * as s from './styles.module.scss';
import { ProfileForm } from 'src/components/ProfileForm/ProfileForm';
import { useTokenContext } from 'src/TokenProvider';

const ProfileScreen: FC = () => {
  const [token] = useTokenContext();
  console.log('ProfileScreen  token', token);

  return (
    <div className={s.root}>
      <ProfileForm />
    </div>
  );
};

export default ProfileScreen;
