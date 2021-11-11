import React from 'react';

// material-ui
import { Link, Typography, Stack } from '@material-ui/core';

// ===========================|| FOOTER - AUTHENTICATION 2 & 3 ||=========================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank" underline="hover">
            @포켓트레이너
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank" underline="hover">
            <h4>&copy;우리 잘 수 있을까</h4>
        </Typography>
    </Stack>
);

export default AuthFooter;
