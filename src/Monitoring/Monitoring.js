import {Container, makeStyles} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux'
import MonitoringListOfParameters from './MonitoringListOfParameters/MonitoringListOfParameters';

const useStyle = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    }
}))


const Monitoring = (props) => {
    const classes = useStyle();

    return <Container className={classes.root} maxWidth='md'>
        {
            props.category.map(category => <MonitoringListOfParameters key={category.id} name={category.name}
                                                                       categoryId={category.id}/>)
        }
    </Container>
}

const mapStateToProps = (state) => ({
    category: state.selectedParameters.category
})

export default connect(mapStateToProps)(Monitoring);