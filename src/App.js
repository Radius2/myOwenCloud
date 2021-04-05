import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, useHistory, useLocation, Redirect} from 'react-router-dom';
import ChartContainer from './ChartContainer/ChartContainer';
import Monitoring from './Monitoring/Monitoring';
import * as owen from './owenAxios';
import Settings from './Settings/Settings';
import * as actions from './store/actions/index';
import Login from './Login/Login';
import NavBar from './UI/NavBar';
import {deleteLogin} from './shared/commonFunction';

const DEMO = {
    login: 'demo@owen.ru',
    password: 'demo123'
};

const App = props => {
    const [auth, setAuth] = useState({
        login: '',
        password: '',
    });

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('login') && localStorage.getItem('password')) {
            owen.getToken(localStorage.getItem('login'), localStorage.getItem('password'))
                .then(() => {
                    props.getDevices();
                    props.getConfiguration();
                });
        } else {
            history.push('/');
        }
    }, []);

    console.log('App called');

    const inputLoginHandler = event => {
        setAuth(prevAuth => ({
            login: event.target.value,
            password: prevAuth.password,
        }));
    };
    const inputPasswordHandler = event => {
        setAuth(prevAuth => ({
            login: prevAuth.login,
            password: event.target.value,
        }));
    };

    const logout = () => {
        deleteLogin();
        owen.deleteToken();
        props.cleanState();
        history.push('/');
    };

    return (
        <Switch>
            <Route path="/" exact>
                <Login
                    login={auth.login}
                    password={auth.password}
                    passwordChange={inputPasswordHandler}
                    loginChange={inputLoginHandler}
                    tokenRequest={() => owen.getToken(auth.login, auth.password)}
                    demoLogin={() => owen.getToken(DEMO.login, DEMO.password)}
                />
            </Route>
            <NavBar name={'Инженерные технологии'} logout={logout}>
                <Switch>
                    <Route path="/dashboard/chart">
                        <ChartContainer/>
                    </Route>
                    <Route path="/dashboard" exact>
                        <Monitoring/>
                    </Route>
                    <Route path="/parameters" exact>
                        <Settings/>
                    </Route>
                    <Route path="*">
                        <Redirect to="/"/>
                    </Route>
                </Switch>
            </NavBar>
        </Switch>
    );
};

const mapStateToProps = state => {
    return {parameters: state.selectedParameters.parameters};
};

const mapDispatchToProps = dispatch => {
    return {
        getDevices: () => dispatch(actions.requestDevices()),
        getConfiguration: () => dispatch(actions.getConfiguration()),
        cleanState: () => dispatch(actions.cleanSelectedParameters()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
