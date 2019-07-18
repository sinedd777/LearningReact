import React from 'react';
import {connect} from 'react-redux'
import {logout, removeError, setCurrentUser} from "../store/actions";
import {Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import '../styles/navbar.css'
import api from "../services/api";


const Navbar1 = ({auth}) => (<div>

    <nav className="navbar navbar-expand-sm barcolor navbar-dark">
        <ul className="navbar-nav flex-row">
            <li className="nav-item nav-brand font-weight-bold active spacer">
                <a className="nav-link nav-brand" href="/">Pollr</a>
            </li>
            <li className="nav-item spacer">
                <a className="nav-link " href="/createpoll">Create Poll</a>
            </li>

        </ul>
        <ul className="navbar-nav ml-auto flex-row">
            {!auth.isAuthenticated &&

                <li className="nav-item spacer">
                <a className="nav-link" href="/register">Register</a>
            </li>
            }
            {!auth.isAuthenticated &&
            <li className="nav-item spacer">
                <a className="nav-link" href="/login">Login</a>
            </li>
            }


            {auth.isAuthenticated &&
            <li className="nav-item spacer">
                <a className="nav-link" onClick={logout
                } href="/">Logout</a>
            </li>
            }
        </ul>

    </nav>
    {/*            <Nav.Link href="/" >Home</Nav.Link>*/}
    {/*            <Nav.Link href="/register" >Register</Nav.Link>*/}
    {/*            <Nav.Link href="/login"  >Login</Nav.Link>*/}
    {/*            <Nav.Link href="/createpoll" >Create Poll</Nav.Link>*/}
    {/*            <Nav.Link href="" onClick={console.log("helllo")}>Logout</Nav.Link>*/}
    <p> </p>
    {auth.isAuthenticated &&  <p className='text'>Welcome back <b>{auth.user.username}</b> !</p>}

</div>);

export default  connect(store =>({ auth: store.auth}))(Navbar1);