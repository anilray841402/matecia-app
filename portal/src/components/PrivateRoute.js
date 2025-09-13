import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Element, component: Component }) => {
  const token = Cookies.get('token');
  return token ? <Element component={Component} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
