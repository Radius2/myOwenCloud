import React, {useEffect} from 'react';
import {ListItem, ListItemText, makeStyles, Typography} from '@material-ui/core';
import {useRouteMatch, useHistory, Link} from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    container: {},
    item: {
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        flexGrow: '1',
    },
    value: {
        flexBasis: '80px',
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
}));


const MonitoringParameter = (props) => {
    const classes = useStyles();
    const {path, url} = useRouteMatch()
    const history = useHistory()

    const buttonHandler = () => {
        history.push(`${url}/chart/?ids[]=${props.id}`)
    }

    return <ListItem button dense
                     className={classes.container}
                     onClick={buttonHandler}>
        <ListItemText className={classes.item} disableTypography>
            <Typography className={classes.name}>{props.name}</Typography>
            <Typography variant='body1' align='right' noWrap
                        className={classes.value}>{props.value}</Typography>
        </ListItemText>
    </ListItem>

}
export default MonitoringParameter