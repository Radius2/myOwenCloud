import React from 'react';
import {
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    makeStyles,
    Typography, IconButton
} from '@material-ui/core';

const useStyles = makeStyles({
    item: {
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        flexGrow: '1',
    },
    value: {
        flexBasis: '72px',
    }
});

const Parameter = (props) => {
    const classes = useStyles();


    return (
        <ListItem button onClick={props.clicked}>
            <ListItemIcon className={classes.checkbox}>
                <Checkbox checked={props.checked}/>
            </ListItemIcon>
            <ListItemText className={classes.item} disableTypography>
                <Typography variant='body2' className={classes.name}>{props.name}</Typography>
                <Typography variant='body2' align='right' className={classes.value}>{props.value}</Typography>
            </ListItemText>
        </ListItem>
    );
};

export default Parameter;
