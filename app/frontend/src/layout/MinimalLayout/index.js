import React from 'react';
import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';

// ===========================|| MINIMAL LAYOUT ||=========================== //

const MinimalLayout = () => (
    <>
        <Outlet />
    </>
);

export default MinimalLayout;
