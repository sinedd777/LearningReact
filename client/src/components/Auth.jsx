import React,{Component,Fragment} from 'react';
import {connect} from "react-redux";
import {authUser,logout} from "../store/actions";
import '../styles/auth.css'

class Auth extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e){
        const {username,password} = this.state;
        const {authType} = this.props;
        e.preventDefault();
        console.log(username,password);

        this.props.authUser(authType,{username,password});
    }

    render() {
        const {username,password} = this.state;

        return <div>
        <form className="form" onSubmit={this.handleSubmit}>
            <br/><br/>
            <table className="table">
                <tr><input className="form-control mb-2 mr-sm-2" type="text" value={username} name="username" onChange={this.handleChange} placeholder="Username" minLength={5} />
                </tr>
                <tr><input className="form-control mb-2 mr-sm-2" type="password" value={password} name="password" onChange={this.handleChange} placeholder="Password" minLength={8}/>
                </tr>
                <tr> <button className="btn btn-primary buttons_center" type="submit" >Submit</button>
                </tr>
            </table>
        </form>
        </div>
    }
}

export default connect(
    ()=>({}),
    {authUser,logout}
    )
(Auth)