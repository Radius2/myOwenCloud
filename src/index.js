import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import * as owen from './owenAxios';
import store from './store/store';
import {CssBaseline} from '@material-ui/core';


owen.setInterceptor();


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline/>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
