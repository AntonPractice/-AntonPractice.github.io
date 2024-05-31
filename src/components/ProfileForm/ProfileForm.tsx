import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as styles from './styles.module.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Mutation } from 'src/server.types';
import { CircularProgress } from '@mui/material';
import { FormInput } from '../FormInput/FormInput';
import { DefaultButton } from '../Button/DefaultButton';
import { useTranslation } from 'react-i18next';

type Inputs = {
  mail: string;
  userName: string;
  id?: string;
};

export type EditProfileVariables = {
  email?: string;
  name?: string;
  id?: string;
  signUpDate?: string;
  input?: any;
};

const GET_PROFILE = gql`
  query getProfile {
    profile {
      id
      name
      email
    }
  }
`;
const EDIT_PROFILE = gql`
  mutation Update($input: UpdateProfileInput!) {
    profile {
      update(input: $input) {
        name
      }
    }
  }
`;
export const ProfileForm = () => {
  const { t } = useTranslation();

  const { data, error, loading, refetch } = useQuery(GET_PROFILE);
  const [editProfile] = useMutation<Pick<Mutation, 'profile'>, EditProfileVariables>(EDIT_PROFILE);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      mail: data ? data.profile['email'] : '',
      userName: data ? data.profile['name'] : '',
    },
  });

  useEffect(() => {
    if (data) {
      setValue('mail', data.profile['email']);
      setValue('userName', data.profile['name']);
      setValue('id', data.profile['id']);
    }
  }, [data]);

  const updateData = () => {
    setTimeout(() => {
      refetch();
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      updateData();
    }, 100);
  }, []);


  const customHandleSubmit = (values: any) => {
    const input = {
      name: values.userName,
    };

    editProfile({ variables: { input }, refetchQueries: [{ query: GET_PROFILE }] });
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(customHandleSubmit)}>
        <h1>{t('profile.edit')}</h1>
        <FormInput
          {...register('mail', {
            required: true,
            minLength: {
              value: 3,
              message: 'Минумум 3 символа!',
            },
          })}
          id="mail"
          type="text"
          label="E-Mail"
          name="mail"
          error={errors.mail && !!errors.mail}
          helperText={errors.mail && errors?.mail?.message}
        />
        <FormInput
          {...register('userName', {
            required: true,
            minLength: {
              value: 3,
              message: 'Минумум 3 символа!',
            },
          })}
          id="userName"
          type="text"
          label="Имя"
          name="userName"
          error={errors.userName && !!errors.userName}
          helperText={errors.userName && errors?.userName?.message}
        />
        <hr />
        <DefaultButton type="submit" disabled={!isValid}>
        {t('profile.ed')}
        </DefaultButton>
      </form>
    </>
  );
};
