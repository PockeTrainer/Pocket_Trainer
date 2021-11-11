import React, { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthForgotID = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotID')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword')));
const AuthShowId = Loadable(lazy(() => import('views/pages/authentication/authentication3/ShowID')));
const AuthShowPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ShowTmpPassword')));

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/pages/forgot-id',
            element: <AuthForgotID />
        },
        {
            path: '/pages/forgot-password',
            element: <AuthForgotPassword />
        },
        {
            path: '/pages/showID',
            element: <AuthShowId />
        },
        {
            path: '/pages/showTmpPassword',
            element: <AuthShowPassword />
        }
    ]
};

export default AuthenticationRoutes;
