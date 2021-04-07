import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import Preview from './Preview/Preview';
import DeviceList from './DeviceList/DeviceList';
import {BottomNavigation, BottomNavigationAction, Grid, Container, makeStyles, Hidden, Box} from '@material-ui/core';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyle = makeStyles(theme => ({
    scrolled: {
        position: 'relative',
        maxHeight: props => `calc(100vh - ${props.appBar + props.bottomNavigation}px )`,
        overflowY: 'scroll',
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    bottomNavigation: {
        backgroundColor:'#fafafa' ,
        position: 'fixed',
        width: '100%',
        left: 0,
        bottom: '0',
    },
}));


const Settings = (props) => {
        const theme = useTheme();
        const [value, setValue] = useState('select');
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
        const narrowScreen = useMediaQuery(theme.breakpoints.down('md'));
        const bottomNavigation = narrowScreen ? 60 : 0;

        const classes = useStyle({appBar: 64, bottomNavigation});

        return <Container maxWidth={'lg'} style={{padding: '8px'}}>
            <Grid container spacing={2}>
                <Hidden smDown={value === 'preview'}>
                    <Grid className={classes.scrolled} item xs={12} md>
                        <DeviceList/>
                    </Grid>
                </Hidden>
                <Hidden smDown={value === 'select'}>
                    <Grid className={classes.scrolled} item xs={12} md>
                        <Preview/>
                    </Grid>
                </Hidden>
            </Grid>
            <Hidden mdUp>
                <BottomNavigation value={value}
                                  onChange={(event, newValue) => {
                                      setValue(newValue);
                                  }}
                                  showLabels
                                  className={classes.bottomNavigation}>
                    <BottomNavigationAction label="Выбор" value="select" icon={<CheckBoxIcon/>}/>
                    <BottomNavigationAction label="Предпросмотр" value="preview" icon={<ViewAgendaIcon/>}/>
                </BottomNavigation>
            </Hidden>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
