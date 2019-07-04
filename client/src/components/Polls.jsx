import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPolls, getUserPolls ,getCurrentPoll,deletePoll} from '../store/actions';
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import '../styles/polls.css'
import Alert from "reactstrap/es/Alert";

class Polls extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.toggle=this.toggle.bind(this);
        this.state = {
            remove:false,
            visible:false,
            class:'ul',
        }
    }

    componentDidMount() {
        const { getPolls } = this.props;
        getPolls();
    }


    handleSelect(id) {
        if(this.state.remove===true)
        {
            this.props.deletePoll(id);
            this.setState({
                visible: !this.state.visible,
                remove: !this.state.remove,
                class: 'ul'
            });

        }
        else{
            const {history} = this.props;
            history.push(`/poll/${id}`);
        }

    }

    toggle() {
        this.setState({
            remove: !this.state.remove,
            class: 'x',
        })
    }

    render() {
        const { getPolls, getUserPolls, auth } = this.props;

        const polls = this.props.polls.map(poll => (
            <ListGroup as={this.state.class} >
                <ListGroup.Item as="li" onClick={() => this.handleSelect(poll._id)}  key={poll._id} >
                    {poll.question}</ListGroup.Item>
            </ListGroup>
                )
        );


        return (
            <Fragment>
                <div className="alert1">
                    <Alert color="primary" isOpen={this.state.visible} toggle={()=>{
                        this.setState({
                        visible: !this.state.visible,
                    })
                    }}>Success! Want to Delete Another?</Alert>
                </div>
                {auth.isAuthenticated && (
                    <div className="buttons">
                        <ButtonGroup aria-label="Basic example" class="polls">
                            <Button variant="secondary" onClick={getPolls}>All Polls</Button>
                            <Button variant="secondary" onClick={getUserPolls}>My Polls</Button>
                            <Button variant="secondary" onClick={()=>{
                                getUserPolls();
                                this.toggle()}}>Delete Polls</Button>
                        </ButtonGroup>

                    </div>
                )}
                <div className="polls">{polls}</div>
            </Fragment>
        );
    }
}



export default connect(
    store => ({
        auth: store.auth,
        polls: store.polls,
    }),
    { getPolls, getUserPolls ,getCurrentPoll,deletePoll},
)(Polls);