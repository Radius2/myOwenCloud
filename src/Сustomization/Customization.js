import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import ChartContainer from '../ChartContainer/ChartContainer';
import * as actions from '../store/actions';
import DashBoard from './DashBoard/DashBoard';
import DeviceList from './DeviceList/DeviceList';
import {Button, Grid, Container, makeStyles} from '@material-ui/core';

const useStyle = makeStyles({
    scrolled: {
        position: 'relative',
        maxHeight: props => `calc(100vh - ${props.appBar}px)`,
        overflowY: 'scroll',
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    button: {
        position: 'fixed',
        bottom: '16px',
        right: '16px'
    }
});


const Customization = (props) => {
        const {category, parameters, isChanged} = props;
        const refProps = useRef({category, parameters, isChanged});

        useEffect(() => {
                refProps.current = {category, parameters, isChanged};
            },
            [category, parameters]);

        useEffect(() => {
                return () => {
                    if (refProps.current.isChanged) {
                        props.saveConfigurationToServer({
                            category: refProps.current.category,
                            parameters: refProps.current.parameters
                        });
                    }
                };
            },
            []
        );

        const classes = useStyle({appBar: 64});
        return <Container maxWidth={'lg'} style={{padding: '8px'}}>
            <Grid container spacing={2}>
                <Grid className={classes.scrolled} item xs={12} md>
                    <DeviceList/>
                </Grid>
                <Grid className={classes.scrolled} item xs={12} md>
                    <DashBoard/>
                </Grid>
            </Grid>
        </Container>;

    }
;
const mapStateToProps = ({selectedParameters}) => ({
    category: selectedParameters.category,
    parameters: selectedParameters.parameters,
    isChanged: selectedParameters.isChanged
});

const mapDispatchToProps = (dispatch) => ({
    saveConfigurationToServer: (config) => dispatch(actions.saveConfiguration(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customization);
