import {Divider, List, makeStyles, Paper, TextField} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Parameter from './ParameterEditable/ParameterEditable';
import OpenWithIcon from '@material-ui/icons/OpenWith';

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: '70px',
        marginBottom: theme.spacing(2),
    },
    list: {
        width: '100%',
    },
    header: {
        display: 'flex'
    },
    categoryName: {
        flexGrow: 1,
        minWidth: 'max-content',
        padding: theme.spacing(2),
    },
    moveIcon: {
        alignSelf: 'center'
    }
}));

const ListOfParameters = (props) => {
    const classes = useStyles();
    const {category} = props;
    return (
        <Draggable draggableId={category.id.toString()} index={props.index}>
            {provided => (
                <Paper key={category.id}
                       elevation={1}
                       className={classes.paper}
                       ref={provided.innerRef}
                       {...provided.draggableProps}>
                    <div className={classes.header}>
                        <TextField className={classes.categoryName}
                                   value={category.name}
                                   onChange={(e) => props.renameList(props.index, e.target.value)}/>
                        <IconButton {...provided.dragHandleProps} className={classes.moveIcon} aria-label="move">
                            <OpenWithIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <Droppable droppableId={category.id.toString()}
                               type='parameters'>
                        {provided => (
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
                        )}
                    </Droppable>
                </Paper>
            )}
        </Draggable>
    )
}

const mapStateToProps = state => ({
    selectedParameters: state.selectedParameters.parameters,
});

const mapDispatchToProps = dispatch => {
    return {
        deleteSelectedParameters: (id) => dispatch(actions.deleteSelectedParameter(id)),
        renameList: (index, newName) => dispatch(actions.renameCategory(index, newName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfParameters);
