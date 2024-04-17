import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTokenContext } from 'src/TokenProvider';

export type ProtectedRouteProps = {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [token] = useTokenContext();
  const location = useLocation();
  if (token) return <>{children}</>;
  return <Navigate to="/auth" state={{ from: location }} replace />;
};
