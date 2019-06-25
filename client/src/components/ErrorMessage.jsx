import React,{Fragment} from 'react';
import {connect} from "react-redux";
import Alert from "react-bootstrap/Alert";

const ErrorMessage = ({error}) =>(
    <Fragment>
        {error.message!=null &&
            <div class="alert alert-warning" role="alert">
                    {error.message}
            </div>}
    </Fragment>
);


export default connect(store=> ({error: store.error}))(ErrorMessage);