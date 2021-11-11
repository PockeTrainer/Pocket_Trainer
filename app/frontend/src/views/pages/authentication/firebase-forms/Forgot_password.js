import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Radio,
    RadioGroup,
    FormLabel,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// icon
import AttachEmailIcon from '@material-ui/icons/AttachEmail';

// Modal
import Modal from '@material-ui/core/Modal';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: `${theme.palette.grey[100]} !important`,
        color: `${theme.palette.grey[900]}!important`,
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    },
    sendButton: {
        backgroundColor: '#ff3838',
        '&:hover': {
            backgroundColor: '#2196f3'
        }
    }
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

//= ==========================|| FIREBASE - REGISTER ||===========================//

const FirebaseForgotPassword = ({ ...others }) => {
    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const [value, setValue] = React.useState(new Date());

    const [open, setOpen] = React.useState(false);
    // Modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Typography variant="subtitle1">사용자정보를 입력해주세요</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    verify_num: '',
                    id: '',
                    submit: null,
                    user_name: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('@이메일 형태이어야합니다').max(255).required('이메일을 입력해주세요'),
                    verify_num: Yup.string().max(255).required('이메일로 받은 인증번호를 입력해주세요'),
                    id: Yup.string().max(255).required('이름을 입력해주세요'),
                    user_name: Yup.string().max(255).required('이름을 입력해주세요')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.user_name && errors.user_name)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-user_name-register">이름</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-user_name-register"
                                type="text"
                                value={values.user_name}
                                name="user_name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.user_name && errors.user_name && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.user_name}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.id && errors.id)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-email-register">아이디</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="text"
                                value={values.id}
                                name="id"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.id && errors.id && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.id}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-email-register">이메일</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.email}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Button
                            size="large"
                            variant="contained"
                            endIcon={<AttachEmailIcon />}
                            className={classes.sendButton}
                            onClick={handleOpen}
                        >
                            인증번호전송
                        </Button>
                        <FormControl fullWidth error={Boolean(touched.verify_num && errors.verify_num)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-register">인증번호</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="verify_num"
                                label="verify_num"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.verify_num && errors.verify_num && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {' '}
                                    {errors.verify_num}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box
                            sx={{
                                mt: 2
                            }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.sendButton}
                                    component={Link}
                                    to="/pages/showTmpPassword"
                                >
                                    비밀번호재설정
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2">
                        ✔이메일전송완료
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        회원님의 이메일로 인증번호가 전송되었으니 확인하시기바랍니다.
                    </Typography>
                    <Button
                        size="large"
                        variant="contained"
                        endIcon={<AttachEmailIcon />}
                        className={classes.sendButton}
                        onClick={handleClose}
                    >
                        닫기
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default FirebaseForgotPassword;
