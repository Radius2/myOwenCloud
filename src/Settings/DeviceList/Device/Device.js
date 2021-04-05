import React, {useState} from 'react';
import {Card, CardContent, CardHeader, LinearProgress, Typography, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {getLastUpdate} from '../../../shared/commonFunction';
import ParameterCategory from './ParameterCategory/ParameterCategory';


const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(2),
    },
    header: {
        position: 'sticky',
    },
    content: {
        padding: '0',
        '&:last-child': {
            padding: 0,
        },
    },
    title: {
        fontSize: 14,
    },
    progress: {
        width: '100%',
    },
}));

const Device = props => {
    const {device} = props;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader className={classes.header} title={device.name}/>
            <CardContent className={classes.content}>
                {!device.categories ? (
                    <LinearProgress className={classes.progress}/>
                ) : (
                    device.categories.map(category => {
                        return (
                            <ParameterCategory
                                key={category.id}
                                name={category.name}
                                parameters={device.parameters.filter(parameter => {
                                    return parameter.category_id === category.id;
                                })}
                                device={{name: device.name, id: device.id}}
                            />
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};

export default Device;
