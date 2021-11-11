import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@material-ui/core';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';

// style constant
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '330px',
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px'
        }
    },
    listAction: {
        top: '22px'
    },
    actionColor: {
        color: theme.palette.grey[500]
    },

    listItem: {
        padding: 0
    },
    sendIcon: {
        marginLeft: '8px',
        marginTop: '-3px'
    },
    listDivider: {
        marginTop: 0,
        marginBottom: 0
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px'
    },
    listChipWarning: {
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: '24px',
        padding: '0 6px'
    },
    listAvatarSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        border: 'none',
        borderColor: theme.palette.success.main
    },
    listAvatarPrimary: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        border: 'none',
        borderColor: theme.palette.primary.main
    },
    listContainer: {
        paddingLeft: '56px'
    },
    uploadCard: {
        backgroundColor: theme.palette.secondary.light
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    itemAction: {
        cursor: 'pointer',
        padding: '16px',
        '&:hover': {
            background: theme.palette.primary.light
        }
    }
}));

// ===========================|| NOTIFICATION LIST ITEM ||=========================== //

const NotificationList = () => {
    const classes = useStyles();

    return (
        <List className={classes.navContainer}>
            <div className={classes.itemAction}>
                <ListItem alignItems="center" className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">앙기모링님</Typography>} />
                    <ListItemSecondaryAction className={classes.listAction}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom className={classes.actionColor}>
                                    2분전에 알림
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className={classes.listContainer}>
                    <Grid item xs={12} className={classes.paddingBottom}>
                        <Typography variant="subtitle2">새로운 어깨운동을 추천해드려요!</Typography>
                        <Typography variant="subtitle2">사이드레터럴라이즈의 기초!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <Chip label="새로운알림" className={classes.listChipWarning} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Divider className={classes.listDivider} />
            <div className={classes.itemAction}>
                <ListItem alignItems="center" className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar className={classes.listAvatarSuccess}>
                            <IconBuildingStore stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">앙기모링님</Typography>} />
                    <ListItemSecondaryAction className={classes.listAction}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom className={classes.actionColor}>
                                    1시간전에 알림
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className={classes.listContainer}>
                    <Grid item xs={12} className={classes.paddingBottom}>
                        <Typography variant="subtitle2">새로운 식단조리법을 추천해드려요!</Typography>
                        <Typography variant="subtitle2">닭가슴살을 맛있게!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <Chip label="새로운알림" className={classes.listChipWarning} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Divider className={classes.listDivider} />
            <div className={classes.itemAction}>
                <ListItem alignItems="center" className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar className={classes.listAvatarPrimary}>
                            <IconMailbox stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">업적달성</Typography>} />
                    <ListItemSecondaryAction className={classes.listAction}>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Typography variant="caption" display="block" gutterBottom className={classes.actionColor}>
                                    이틀전에 알림
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className={classes.listContainer}>
                    <Grid item xs={12} className={classes.paddingBottom}>
                        <Typography variant="subtitle2">축하드려요 푸시업의 개수가 처음시작한 대비 무려 30개나 늘었어요!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <Button variant="contained" disableElevation>
                                    기록보기
                                    <IconBrandTelegram stroke={1.5} size="1.3rem" className={classes.sendIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Divider className={classes.listDivider} />
        </List>
    );
};

export default NotificationList;
