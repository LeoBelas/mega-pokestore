import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'

import Header from './template/header'

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => 
        localStorage.getItem("APP_TOKEN_KEY") ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: "/admin/login",
                state: {from: props.location}
            }}
            />
        )
        }
    />
)
    
export default function Routes(){
    return(
        <BrowserRouter>
                <Header />
                <Switch>
                <Route path="/" exact component={Home} />
                <Route path="*" component={PageNotFound} />           
            </Switch>
        </BrowserRouter>
    )
}