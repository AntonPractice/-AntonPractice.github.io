import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from 'src/navigation/ProtectedRoute';
import Layout from 'src/components/Layout/Layout';

import ProductList from 'src/screens/ProductList';
import Basket from 'src/screens/Basket';
import Auth from 'src/screens/Auth';
import NotFound from 'src/screens/NotFound';
import ProfileScreen from 'src/screens/ProfileScreen';
import ProfileProductList from 'src/screens/ProfileBooks';
import Order from 'src/screens/Order';

const mainElement = (
  <ProtectedRoute>
    <Routes>
      <Route index element={<Navigate to="1" replace />} />
      <Route path=":id" element={<ProfileScreen />} />
      <Route path="*" element={<NotFound />} />
      <Route path="mybooks" element={<ProfileProductList />} />
      <Route path="orders" element={<Order />} />
    </Routes>
  </ProtectedRoute>
);

export type NavigationProps = {
  children: React.ReactNode;
};

export const Navigation: FC<NavigationProps> = ({ children }) => (
  <BrowserRouter>
    <Layout>
      {children}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route index element={<ProductList />} />
        <Route path="other" element={<Basket />} />
        <Route path="*" element={mainElement} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
