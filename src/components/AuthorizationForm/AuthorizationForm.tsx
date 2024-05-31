import React from 'react';
import { useForm } from 'react-hook-form';
import * as styles from './styles.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationState } from 'src/navigation/types';
import { profileActions } from 'src/store/profile';
import { useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { Mutation } from 'src/server.types';
import { DefaultButton } from '../Button/DefaultButton';
import { FormInput } from '../FormInput/FormInput';
import { useTokenContext } from 'src/TokenProvider';

export type AddUserVariables = {
  email: string;
  password: string;
  commandId: string;
};

const SIGN_IN = gql`
  mutation Mutation($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
        profile {
          name
          email
          id
        }
      }
    }
  }
`;

type Inputs = {
  mail: string;
  password: string;
};

export const AuthorizationForm = () => {
  const [, { login }] = useTokenContext();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn] = useMutation<Pick<Mutation, 'profile'>, AddUserVariables>(SIGN_IN);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      mail: '',
      password: '',
    },
  });
  const addProfile = (newName: string, id: string) => dispatch(profileActions.set({ newName, id }));

  const customHandleSubmit = (values: any) => {
    const state = location.state as NavigationState;
    const email = values.mail;
    const password = values.password;
    const commandId = new Date().toISOString();
    signIn({ variables: { email, password, commandId } })
      .then((res) => {
        navigate(state?.from || '/');
        addProfile(res.data.profile.signin.profile.email, res.data.profile.signin.profile.id);
        localStorage.setItem('token', res.data.profile.signin.token);
        login(res.data.profile.signin.token);
        reset();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(customHandleSubmit)}>
      <h1>Форма авторизации</h1>
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
        error={!!errors.mail}
        helperText={errors?.mail?.message}
      />
      <FormInput
        {...register('password', {
          required: true,
          minLength: {
            value: 3,
            message: 'Минумум 3 символа!',
          },
        })}
        id="password"
        type="text"
        label="Пароль"
        name="password"
        error={!!errors.password}
        helperText={errors?.password?.message}
      />
      <hr />
      <DefaultButton type="submit" disabled={!isValid}>
        {' '}
        Войти{' '}
      </DefaultButton>
    </form>
  );
};
