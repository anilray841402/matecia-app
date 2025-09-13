import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AppFooter, AppSidebar, AppHeader } from '../components/index';
import { CContainer } from '@coreui/react';
import Cookies from 'js-cookie';
import apiClient from '../service/apiClient';

const ExhibitorLayout = ({ component }) => {
  const [logedIn, setLogedIn] = useState(null); // null = loading
  const Component = component;

  useEffect(() => {
    const token = Cookies.get('token');
    const verifyToken = async () => {
      if (token) {
        try {
          const res = await apiClient.verifyToken(); // Make an API call
          if (res.user.role === "user") {
            setLogedIn(true);
          } else {
            setLogedIn(false);
            Cookies.remove('token'); // Clear expired token
          }
        } catch (err) {
          console.error("Token verification failed", err);
          setLogedIn(false);
          Cookies.remove('token'); // Remove invalid token
        }
      } else {
        setLogedIn(false);
      }
    };

    verifyToken();
  }, []);

  // While checking login status
  if (logedIn === null) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!logedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
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

export default ExhibitorLayout;
