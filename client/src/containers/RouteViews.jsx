import React from 'react'
import {connect} from 'react-redux';
import {Switch,Route,withRouter} from 'react-router-dom'

import AuthPage from "../pages/AuthPage";
import CreatePollPage from "../pages/CreatePollPage";
import TestPage from '../pages/TestPage';
import HomePage from "../pages/HomePage";
import PollPages from '../pages/PollPages';

import {getCurrentPoll} from "../store/actions";

const RouteViews = ({ getCurrentPoll, auth }) => (
<main>

    <Switch>
        <Route exact path ="/poll/new" render={() => <CreatePollPage isAuthenticated={auth.isAuthenticated}/>} />
        <Route exact path ="/" render={props => <HomePage{...props}/>} />
        <Route exact path ="/login" render={() => <AuthPage authType="login" isAuthenticated={auth.isAuthenticated}/>} />
        <Route exact path ="/register" render={() => <AuthPage authType="register" isAuthenticated={auth.isAuthenticated}/>} />
        <Route exact path = "/createpoll" render={()=> <TestPage/>} />

        <Route
            exact
            path="/poll/:id"
            render={props => (
                <PollPages getPoll={id => getCurrentPoll(id)} {...props} />
            )}
        />
        <Route exact path = "/poll/new" render={()=> <CreatePollPage isAuthenticated={auth.isAuthenticated}/>} />
    </Switch>

</main>);

export default withRouter(connect(
    store => ({auth : store.auth}),
    {getCurrentPoll}
)(RouteViews));