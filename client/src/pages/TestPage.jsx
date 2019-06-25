import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { store } from '../store';
import { setToken, setCurrentUser, addError } from '../store/actions';
import '../index.css'
import Auth from '../components/Auth';
import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';
import CreatePoll from '../components/CreatePoll';
import Polls from "../components/Polls";
import CreatePollPage from "./CreatePollPage";


if (localStorage.jwtToken) {
    setToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
    } catch (err) {
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(err));
    }
}

const UITest = (props) => (
    <Provider store={store}>
        <Fragment>
            {/*<h1>UI Test Page</h1>*/}
            {/*<h2>Testing Error Component: </h2>*/}
            {/*<ErrorMessage />*/}
            {/*<hr />*/}

            {/*<h2>Testing Auth Component: </h2>*/}
            {/*<Auth />*/}
            {/*<hr />*/}


            <h2 class="heading"> Create Poll </h2>
            <CreatePoll />
            <hr />


            {/*<h2>Testing Polls Component: </h2>*/}
            {/*<Polls {...props} />*/}
            {/*<hr />*/}

            {/*<h2>Testing Poll Component: </h2>*/}
            {/*<Poll />*/}
            {/*<hr />*/}
        </Fragment>
    </Provider>
);

export default withRouter(UITest);