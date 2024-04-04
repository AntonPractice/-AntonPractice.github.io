import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from 'src/navigation/ProtectedRoute';
import Layout from 'src/components/Layout/Layout';

import ProductList from 'src/screens/ProductList';
import Other from 'src/screens/Other';
import Auth from 'src/screens/Auth';
import NotFound from 'src/screens/NotFound';
import ProfileScreen from 'src/screens/ProfileScreen';

const mainElement = (
  <ProtectedRoute>
    <Layout>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="other" element={<Other />} />
        <Route path="profileScreen">
          {/* Зачем replace? */}
          <Route index element={<Navigate to="1" replace />} />
          {/* <Route index element={<Navigate to="/cats/1" replace />} /> */}
          <Route path=":id" element={<ProfileScreen />}>
            <Route path=":batid" element={<ProfileScreen />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </ProtectedRoute>
);


export type NavigationProps = {
  children: React.ReactNode;
}


export const Navigation: FC<NavigationProps> = ({ children }) => (
    // рассказать про basename
    // <BrowserRouter basename="company/1">
    <BrowserRouter>
        {children}
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={mainElement} />
        </Routes>
    </BrowserRouter>
);
