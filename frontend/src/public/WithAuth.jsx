import React from 'react';
import { Navigate } from 'react-router-dom';

const WithAuth = (Component) => {
    const AuthRoute = (props) => {
        const isAuth = !!localStorage.getItem('token');
        return isAuth ? <Component {...props} /> : <Navigate to="/login" />;
    };

    return AuthRoute;
};

export default WithAuth;