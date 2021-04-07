import React from 'react';
import {connect} from 'react-redux';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

import * as actions from '../../store/actions';
import ListOfParameters from './ListOfParameters/ListOfParameters';

const Preview = props => {
    const onDragEnd = (result) => {
        if (!result.destination) return;

        if (result.type === 'parameters') {
            console.log('parameters', result);
            return props.sortSelectedParameters(result.source, result.destination);
        }
        if (result.type === 'category') {
            console.log('categories', result);
            return props.sortCategoryes(result.source, result.destination);
        }

    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'main'}
                       type="category">
                {provided => (
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
        sortCategoryes: (from, to) => dispatch(actions.sortCategories(from, to)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);