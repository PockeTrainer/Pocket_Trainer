import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery, TextField } from '@material-ui/core';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';

import AuthFooter from 'ui-component/cards/AuthFooter';

// icon
import AccountCircle from '@material-ui/icons/AccountCircle';

// inputdadorment
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/styles';

// 스타일
const useStyles = makeStyles((theme) => ({
    sendButton: {
        backgroundColor: '#ff3838',
        '&:hover': {
            backgroundColor: '#2196f3'
        }
    }
}));
//= ==============================|| AUTH3 - REGISTER ||===============================//

const ShowID = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography color="red" gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                        아이디확인
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        회원님의 아이디는 이와 같습니다
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-read-only-input"
                                            label="회원님아이디"
                                            defaultValue="앙기모리이이이이이잉"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                                readOnly: true
                                            }}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        className={classes.sendButton}
                                        component={RouterLink}
                                        to="/pages/login/login3"
                                    >
                                        로그인하러 가기
                                    </Button>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default ShowID;
