import React, {Component, Fragment} from "react";
import api from '../services/api';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider}  from 'react-redux';
import decode from 'jwt-decode';

import {store} from '../store';
import {setCurrentUser,addError,setToken} from "../store/actions";
import RouteViews from './RouteViews';
import Navbar from "./NavBar";

if(localStorage.jwtToken){
    setToken(localStorage.jwtToken);
    try{
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)))
    }catch (e) {
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(e));
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar/>
                <RouteViews/>
            </Fragment>
        </Router>
    </Provider>
);

//
// class App extends React.Component{
//     async componentDidMount() {
//         const result = await api.call('post', 'auth/login', {
//             username: 'username',
//             password: 'password'
//         });
//         console.log(result);
//     }
//
//     render(){
//         return <div>
//             App works
//         </div>
//     }
// }

// import Navbar from "../Navbar"
// import MainContent from "../MainContent";
// import Footer from "../Footer";
// function App() {
//     return (<div>
//         <Navbar/>
//         <MainContent/>
//         <Footer/>
//         <input type="checkbox" />
//         <p>hello</p>
//
//         <input type="checkbox" />
//         <p>hello</p>
//
//         <input type="checkbox" />
//         <p>hello</p>
//
//         <input type="checkbox" />
//         <p>hello</p>
//     </div>)
// }
export default App
