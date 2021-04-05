import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import {ListItem, ListItemText, makeStyles, Typography} from '@material-ui/core';


const useStyles = makeStyles({
    container: {},
    item: {
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        flexGrow: '1',
    },
    value: {
        flexBasis: '72px',
    },
    button: {
        marginLeft: '8px',
    },
    hidden: {
        display: 'none',
    },
    isDragged: {
        background: 'lightgrey',
    }
});

const MonitoringParameter = (props) => {
    const classes = useStyles();
    return <ListItem dense
                     className={classes.container}>
        <ListItemText className={classes.item} disableTypography>
            <Typography className={classes.name}>{props.name}</Typography>
            <Typography variant='body1' align='right'
                        className={classes.value}>{props.value}</Typography>
        </ListItemText>
    </ListItem>

}
export default MonitoringParameter