import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AdminLayout from "../layouts/Admin";
import AuthLayout from "../layouts/Auth";

const Main = () => (
    <main>
        <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />}/>
            <Route path="/auth" render={props => <AuthLayout {...props} />}/>
            <Redirect from="/" to="/admin/index"/>
        </Switch>
    </main>
);

export default Main;
