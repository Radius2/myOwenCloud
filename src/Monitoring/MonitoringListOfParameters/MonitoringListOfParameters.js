import {Divider, Paper, Typography, List, makeStyles} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import MonitoringParameter from './MonitoringParameter/MonitoringParameter';

const useStyle = makeStyles(theme=>({
    paper: {
        minHeight: '70px',
        marginTop: theme.spacing(2),
    },
    list: {
        width: '100%',
    },
    categoryName: {
        padding:theme.spacing(0.5),
        paddingLeft:theme.spacing(2)
    }
}))

const MonitoringListOfParameters = (props) => {
    const classes = useStyle();

    return <Paper elevation={1} className={classes.paper}>
        <Typography className={classes.categoryName}
                    display='block'>{props.name.toUpperCase()}</Typography>
        <Divider/>
        <List dense className={classes.list}>
            {
                props.parameters.filter(param => param.categoryId === props.categoryId).map(param => (
                    <MonitoringParameter key={param.id}
                                         id={param.id}
                                         name={param.name}
                                         value={param.value}/>
                ))
            }
        </List>
    </Paper>
}

const mapStateToProps = (state) => ({
    parameters: state.selectedParameters.parameters
})

export default connect(mapStateToProps)(MonitoringListOfParameters)