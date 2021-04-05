import React from 'react';
import {ListItem, ListItemText, ListItemIcon, makeStyles, Typography, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Draggable} from 'react-beautiful-dnd';

const useStyles = makeStyles({
    container: {},
    container__item: {
        display: 'flex',
        alignItems: 'center',
    },
    container__item__name: {
        flexGrow: '1',
    },
    container__item__value: {
        flexBasis: '72px',
    },
    container__item__button: {
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
                    <ListItemText className={classes.container__item} disableTypography>
                        <Typography className={classes.container__item__name}>{props.name}</Typography>
                        <Typography variant='body1' align='right' className={classes.container__item__value}>{props.value}</Typography>
                        <IconButton variant='body1' size='small' onClick={props.click} className={classes.container__item__button}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemText>
                </ListItem>
            )}
        </Draggable>

    );
};

export default Parameter;
