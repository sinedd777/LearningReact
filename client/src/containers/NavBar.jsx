import React from 'react';
import {connect} from 'react-redux'
import {logout} from "../store/actions";
import {Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import '../styles/navbar.css'


const Navbar1 = ({auth}) => (<div>

    <nav className="navbar navbar-expand-sm barcolor navbar-dark">
        <ul className="navbar-nav">
            <li className="nav-item nav-brand font-weight-bold active">
                <a className="nav-link nav-brand" href="/">Pollr</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/createpoll">Create Poll</a>
            </li>

        </ul>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={logout} href="/">Logout</a>
            </li>
        </ul>

    </nav>
    {/*            <Nav.Link href="/" >Home</Nav.Link>*/}
    {/*            <Nav.Link href="/register" >Register</Nav.Link>*/}
    {/*            <Nav.Link href="/login"  >Login</Nav.Link>*/}
    {/*            <Nav.Link href="/createpoll" >Create Poll</Nav.Link>*/}
    {/*            <Nav.Link href="" onClick={console.log("helllo")}>Logout</Nav.Link>*/}
    {auth.isAuthenticated &&  <p className='text'>Welcome back <b>{auth.user.username}</b> !</p>}

</div>);

export default  connect(store =>({ auth: store.auth}))(Navbar1);