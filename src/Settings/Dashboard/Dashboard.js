import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Prompt} from 'react-router-dom';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {List, Paper, makeStyles, Button, Typography, Divider} from '@material-ui/core';

import * as actions from '../../store/actions';
import Parameter from './ParameterEditable/ParameterEditable';

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: '70px',
        marginBottom: theme.spacing(2),
    },
    list: {
        width: '100%',
    },
    categoryName: {
        padding: '16px'
    }
}));

const Dashboard = props => {
    const classes = useStyles();

    const onDragEnd = (result) => {
        if (!result.destination) return;
        console.log(result);
        props.sortSelectedParameters(result.source, result.destination);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {props.category.map(category => (
                <Paper key={category.id} elevation={1} className={classes.paper}>
                    <Typography className={classes.categoryName}
                                variant={'h5'}
                                display='block'>{category.name}</Typography>
                    <Divider/>
                    <Droppable droppableId={category.id.toString()}>
                        {
                            (provided, snapshot) => (
                                <List {...provided.droppableProps}
                                      ref={provided.innerRef}
                                      className={classes.list}>
                                    {props.selectedParameters
                                        .map((parameters, index) => ({
                                            ...parameters,
                                            index
                                        })) // добавляем индексы как параметр
                                        .filter(param => param.categoryId === category.id)// отбираем параметры по категории
                                        .map((param) => (
                                            <Parameter id={param.id.toString()}
                                                       index={param.index}
                                                       key={param.id}
                                                       name={param.name}
                                                       value={param.value}
                                                       click={() => props.deleteSelectedParameters(param.id)}
                                            />
                                        ))}
                                    {provided.placeholder}
                                </List>
                            )
                        }
                    </Droppable>
                </Paper>)
            )}
        </DragDropContext>
    );
};


const mapStateToProps = state => ({
    isChanged: state.selectedParameters.isChanged,
    selectedParameters: state.selectedParameters.parameters,
    category: state.selectedParameters.category,
});

const mapDispatchToProps = dispatch => {
    return {
        getNewValueOfSelectedParameters: (parameters) => dispatch(actions.getValues(parameters)),
        sortSelectedParameters: (from, to) => dispatch(actions.sortSelectedParameters(from, to)),
        addValues: values => dispatch(actions.addValuesToParameters(values)),
        deleteSelectedParameters: (id) => dispatch(actions.deleteSelectedParameter(id)),
        saveConfigurationToServer: (config) => dispatch(actions.saveConfiguration(config)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);