import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {List, makeStyles} from '@material-ui/core';

import * as actions from '../../store/actions';
import ListOfParameters from './ListOfParameters/ListOfParameters';

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

const Preview = props => {
    const classes = useStyles();

    const onDragEnd = (result) => {
        if (!result.destination) return;
        console.log(result);
        props.sortSelectedParameters(result.source, result.destination);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'main'}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps}
                         ref={provided.innerRef}>
                        {props.category.map((category, index) => (
                            <ListOfParameters category={category}
                                              key={category.id}
                                              index={index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
};


const mapStateToProps = state => ({
    category: state.selectedParameters.category,
});

const mapDispatchToProps = dispatch => {
    return {
        sortSelectedParameters: (from, to) => dispatch(actions.sortSelectedParameters(from, to)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);