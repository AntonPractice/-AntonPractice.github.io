import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as styles from './styles.module.scss';
import { useTokenContext } from "src/TokenProvider";
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationState } from 'src/navigation/types';

// типизация полей
type Inputs = {
  mail: string;
  password: string;
};


export const ProfileForm = () => {


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  const customHandleSubmit = (values: any) => {
    alert(JSON.stringify(values))

    reset();
  };

  return (
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
        <label htmlFor="password">Пароль</label>
        <input id="password"
          type="text"
          {...register("password", {
            required: true,
            minLength: {
              value: 3,
              message: "Минумум 3 символа!",
            },
          })} />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>
      <hr />
      <button type="submit" disabled={!isValid}>Редактировать</button>
    </form>
  );
};