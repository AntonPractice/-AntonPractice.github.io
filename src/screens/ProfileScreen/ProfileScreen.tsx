import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import * as s from './styles.module.scss';

import { MainProduct } from 'src/components/MainProduct/MainProduct';
import { ProfileForm } from 'src/components/ProfileForm/ProfileForm';

const ProfileScreen: FC = () => {
  const { id, batid } = useParams();

  return (
    <div className={s.root}>
        <ProfileForm />    
    </div>
  );
};

export default ProfileScreen;
