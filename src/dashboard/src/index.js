import React from "react";
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {ConnectedRouter} from 'react-router-redux';
import store, {history} from './stores';
import App from './App';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);
