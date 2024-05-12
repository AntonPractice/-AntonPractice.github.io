import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as styles from './styles.module.scss';
import { useTokenContext } from "src/TokenProvider";
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationState } from 'src/navigation/types';
import { profileActions, profileSelectors } from "src/store/profile";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { Mutation } from "src/server.types";
import { AuthorizationForm } from "./AuthorizationForm";
import { RegistrationForm } from "./RegistrationForm";
import { Button } from "../Button/Button";


export const Authorization = () => {
  const [autorization, setAutorization] = useState<boolean>(true)

  return (
    <>
      <div style={{ display: 'flex' }}>
        {autorization  && <Button size={""} label={"Регистрация"} onClick={() => setAutorization(previousValue => !previousValue)} />}
        {!autorization  && <Button size={""} label={"Авторизация"} onClick={() =>  setAutorization(previousValue => !previousValue)} />}
      </div>
      {autorization ? <AuthorizationForm /> : <RegistrationForm />}
    </>
  );
};
