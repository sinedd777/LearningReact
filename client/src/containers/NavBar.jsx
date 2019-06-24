import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from "../store/actions";

const Navbar = ({auth}) => (<div>

    <Link to="/">Home  </Link>
    <Link to="/register">Register </Link>
    <Link to="/login" >Login </Link>
    <Link to="/" onClick={logout}> Logout</Link>
    <Link to="/test"> Test</Link>
    {auth.isAuthenticated && <p>Logged in as {auth.user.username}</p>}
</div>);

export default connect(store =>({ auth: store.auth}))(Navbar);