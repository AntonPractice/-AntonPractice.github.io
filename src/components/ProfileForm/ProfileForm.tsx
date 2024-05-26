import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as styles from './styles.module.scss';
import { gql, useMutation, useQuery } from "@apollo/client";
import { Mutation } from "src/server.types";

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
  const { data, error, loading } = useQuery(GET_PROFILE);
  const [editProfile] = useMutation<Pick<Mutation, 'profile'>, EditProfileVariables>(
    EDIT_PROFILE
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      mail: data ? data.profile['email'] : '',
      userName: data ? data.profile['name'] : '',
    },
  });

  useEffect(() => {
    if (data) {
      setValue(
        'mail', data.profile['email']
      );
      setValue(
        'userName', data.profile['name']
      );
      setValue(
        'id', data.profile['id']
      );
    }
  }, [data]);


  useEffect(() => {
    localStorage.setItem('protectedMode', 'true');

    return () => {
      localStorage.setItem('protectedMode', '');

    }
  }, []);
  
  const customHandleSubmit = (values: any) => {
    const input = {
      "name": values.userName
    };

    editProfile({ variables: { input }, refetchQueries: [{ query: GET_PROFILE }], });
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (<>
    <form className={styles.form} onSubmit={handleSubmit(customHandleSubmit)}>
      <h1>Редактирование профиля</h1>

      <div className={styles.formInput}>
        <label htmlFor="mail">E-Mail</label>
        <input
          id="mail"
          type="text"
          {...register("mail", {
            required: true,
            minLength: {
              value: 3,
              message: "Минумум 3 символа!",
            },
          })}
        />
        {errors.mail && <p style={{ color: "red" }}>{errors.mail.message}</p>}
      </div>
      <div className={styles.formInput}>
        <label htmlFor="userName">Имя</label>
        <input id="userName"
          type="text"
          {...register("userName", {
            required: true,
            minLength: {
              value: 3,
              message: "Минумум 3 символа!",
            },
          })} />
        {errors.userName && <p style={{ color: "red" }}>{errors.userName.message}</p>}
      </div>
      <hr />
      <button type="submit" disabled={!isValid}>Редактировать</button>
    </form>
  </>
  );
};