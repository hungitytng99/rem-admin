import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Cookies.get('token')
            ?<Redirect to={{ pathname: '/admin/list-products', state: { from: props.location } }} />
            :<Component {...props} />)} 
        />
)
//thieu veryfy token