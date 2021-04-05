import React from 'react';
import {ListItem, ListItemText, makeStyles, Typography, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Draggable} from 'react-beautiful-dnd';

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

const Parameter = (props) => {
    const classes = useStyles();


    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided, snapshot) => (
                <ListItem
                    dense
                    className={`${classes.container} ${snapshot.isDragging ? classes.isDragged : null}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <ListItemText className={classes.item} disableTypography>
                        <Typography className={classes.name}>{props.name}</Typography>
                        <Typography variant='body1' align='right' className={classes.value}>{props.value}</Typography>
                        <IconButton variant='body1' size='small' onClick={props.click} className={classes.button}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemText>
                </ListItem>
            )}
        </Draggable>

    );
};

export default Parameter;
