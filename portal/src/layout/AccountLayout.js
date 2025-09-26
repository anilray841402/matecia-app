import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AppFooter, AccountSidebar, AccountHeader } from '../components/index';
import { CContainer } from '@coreui/react';
import Cookies from 'js-cookie';
import apiClient from '../service/apiClient';

const AccountLayout = ({ component }) => {
  const [logedIn, setLogedIn] = useState(null); 
  const Component = component;

  useEffect(() => {
    const token = Cookies.get('token');

    const verifyToken = async () => {
      if (token) {
        try {
          const res = await apiClient.verifyToken(); 
          if (res.user.role === "account" || res.user.role === "admin") {
            setLogedIn(true);
          } else {
            setLogedIn(false);
            Cookies.remove('token'); 
          }
        } catch (err) {
          console.error("Token verification failed", err);
          setLogedIn(false);
          Cookies.remove('token'); 
        }
      } else {
        setLogedIn(false);
      }
    };

    verifyToken();
  }, []);

  if (logedIn === null) {
    return <div>Loading...</div>;
  }

  if (!logedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AccountSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AccountHeader />
        <div className="body flex-grow-1">
          <CContainer md>
            {Component ? <Component /> : null}
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AccountLayout;
