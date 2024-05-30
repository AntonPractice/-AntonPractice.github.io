import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokenActions, tokenSelectors } from 'src/store/token';
import { profileActions } from 'src/store/profile';
import { cartProductsActions } from 'src/store/cartProducts';

export type TokenProviderProps = {
  children: React.ReactNode;
};

export type Token = string;

export type TokenCallbacks = {
  login: (val?: string) => void;
  logout: () => void;
};

export type TokenContextType = [Token, TokenCallbacks];

const TokenContext = createContext<TokenContextType>(null);

export const useTokenContext = (): TokenContextType => useContext(TokenContext);

export const TokenProvider: FC<TokenProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const clearProfile = () => dispatch(profileActions.remove());
  const clearToken = () => dispatch(tokenActions.clear());
  const clearBasket = () => dispatch(cartProductsActions.clear());
  const tokenSelector = useSelector(tokenSelectors.get);

  const callbacks = useMemo(
    () => ({
      login: (token: string) => {
        dispatch(tokenActions.set(token));
        localStorage.setItem('token', token);
      },
      logout: () => {
        clearProfile();
        clearToken();
        clearBasket();
        localStorage.setItem('token', '');
      },
    }),
    []
  );

  return <TokenContext.Provider value={[tokenSelector, callbacks]}>{children}</TokenContext.Provider>;
};
