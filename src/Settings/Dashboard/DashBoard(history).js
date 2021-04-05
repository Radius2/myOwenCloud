import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {List, Container, Paper, makeStyles, Typography} from '@material-ui/core';


import owenAxios from '../../owenAxios';
import {formatTitleOfValue} from '../../shared/commonFunction'
import * as actions from '../../store/actions';
import Parameter from './ParameterEditable/ParameterEditable';


const useStyles = makeStyles({
    paper: {
        minHeight: '70px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        width: '100%'
    }
});

const DashBoard = props => {
    const classes = useStyles();

    useEffect(() => {
        props.getNewValueOfSelectedParameters(props.selectedParameters);
        const interval = setInterval(() => {
            props.getNewValueOfSelectedParameters(props.selectedParameters);
        }, 6000);
        return () => clearInterval(interval);
    }, [props.selectedParameters.length]);



    const onDragEnd = (result, provided) => {
        console.log(result);
    }

    return (
        <Container maxWidth='md'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'1'}>
                    {
                        (provided, snapshot) => (
                            <Paper elevation={1} className={classes.paper}>
                                <List {...provided.droppableProps}
                                      ref={provided.innerRef}
                                      className={classes.list}>
                                    {props.parameters.map((param, index) => (
                                        <Parameter id={param.id.toString()}
                                                   index={index}
                                                   key={param.id}
                                            // clicked={() => props.deleteParameter(param.id)}
                                                   name={param.name}
                                                   value={param.value}
                                                   noCheckbox/>
                                    ))}
                                    {provided.placeholder}
                                </List>
                            </Paper>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </Container>
    );
};


DashBoard.propTypes = {
    parameters: PropTypes.array,
    addValues: PropTypes.func,
};

const mapStateToProps = state => ({
    parameters: state.selectedParameters.parameters,
});

const mapDispatchToProps = dispatch => {
    return {
        addValues: values => dispatch(actions.addValuesToParameters(values)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);