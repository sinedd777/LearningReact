import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from "../store/actions";
import {Button} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import '../index.css'

const Navbar1 = ({auth}) => (<div className='navver'>

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/" >Home</Nav.Link>
                <Nav.Link href="/register" >Register</Nav.Link>
                <Nav.Link href="/login"  >Login</Nav.Link>
                <Nav.Link href="/createpoll" >Create Poll</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/" onclick={logout}>Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    {auth.isAuthenticated &&  <p className='text'>Welcome back <b>{auth.user.username}</b> !</p>}

</div>);

export default  connect(store =>({ auth: store.auth}))(Navbar1);