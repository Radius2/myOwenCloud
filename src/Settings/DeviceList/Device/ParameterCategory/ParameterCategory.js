import React from 'react';
import {connect} from 'react-redux';
import {Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography, List} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as actions from '../../../../store/actions';
import Parameter from './Parameter/Parameter';


const useStyles = makeStyles({
    category__parameters__list: {
        width: '100%',
        padding: '0',
    },
    category__name: {
        borderTop: '1px solid #e0e0e0'
    },
    category__parameters: {
        paddingBottom: '0',
        padding: '0',
    }
});

const ParameterCategory = (props) => {
    const classes = useStyles();

    return <div style={{display: (props.parameters.length === 0) ? 'none' : 'block'}}>
        <Accordion square>
            <AccordionSummary className={classes.category__name} expandIcon={<ExpandMoreIcon/>}>
                <Typography>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.category__parameters}>
                <List dense className={classes.category__parameters__list}>
                    {props.parameters.map(param => (
                        <Parameter key={param.id}
                                   id={param.id}
                                   checked={props.selectedParameters.some((selectedParam) => selectedParam.id === param.id)}
                                   name={param.name}
                                   value={`${param.value} ${param.measurement.title}`}
                                   clicked={() => props.toggleParameter(param)}
                        />))}
                </List>
            </AccordionDetails>
        </Accordion>
    </div>;
};

const mapStateToProps = (state) => {
    return {selectedParameters: state.selectedParameters.parameters,};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleParameter: (param) => dispatch(actions.toggleSelectedParameter({
            ...param,
            value: `${param.value} ${param.measurement.title}`,
            ofDevice: props.device
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParameterCategory);
