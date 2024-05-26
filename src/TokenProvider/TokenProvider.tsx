import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { tokenActions, tokenSelectors } from 'src/store/token';
import { profileActions, profileSelectors } from "src/store/profile";

export type TokenProviderProps = {
  children: React.ReactNode;
};

export type Token = string;

export type TokenCallbacks = {
  login: () => void;
  logout: () => void;
};

export type TokenContextType = [Token, TokenCallbacks];

const TokenContext = createContext<TokenContextType>(null);

export const useTokenContext = (): TokenContextType => useContext(TokenContext);

export const TokenProvider: FC<TokenProviderProps> = ({ children }) => {

  const dispatch = useDispatch();
  const clearProfile = () => dispatch(profileActions.remove());

  const tokenSelector = useSelector(tokenSelectors.get);
  const genToken = () => dispatch(tokenActions.gen());
  const clearToken = () => dispatch(tokenActions.clear());
  const [token, setToken] = useState<string>(tokenSelector);


  useEffect(() => {
    if (token) {
      genToken()
    } else {
      clearProfile()
      clearToken()
      localStorage.setItem('orderId','')
      localStorage.setItem('protectedMode','')
    }
  }, [token]);

  const callbacks = useMemo(
    () => ({ login: () => setToken(Math.random().toString(16)), logout: () => setToken(null) }),
    []
  );

  return <TokenContext.Provider value={[token, callbacks]}>{children}</TokenContext.Provider>;
};
