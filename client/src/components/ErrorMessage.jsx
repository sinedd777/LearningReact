import React,{Fragment} from 'react';
import {connect} from "react-redux";
import '../styles/errormessage.css'
const ErrorMessage = ({error}) =>(
    <Fragment>
        {error.message!=null &&
            <div><br/>
            <div class="warning alert alert-warning " role="alert">
                    {error.message}
            </div>
            </div>}
    </Fragment>
);


export default connect(store=> ({error: store.error}))(ErrorMessage);