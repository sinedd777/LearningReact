import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../index.css'
import { getPolls, getUserPolls ,getCurrentPoll} from '../store/actions';
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class Polls extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const { getPolls } = this.props;
        getPolls();
    }


    handleSelect(id) {
        const {history} = this.props;
        history.push(`/poll/${id}`);

        // const { getCurrentPoll } = this.props;
        // getCurrentPoll(id);
    }


    render() {
        const { getPolls, getUserPolls, auth } = this.props;

        const polls = this.props.polls.map(poll => (
            <ListGroup as="ul">
                <ListGroup.Item as="li" onClick={() => this.handleSelect(poll._id)} key={poll._id}>
                    {poll.question}</ListGroup.Item>
            </ListGroup>
        ));



        return (
            <Fragment>
                {auth.isAuthenticated && (
                    <div className="buttons">
                        <ButtonGroup aria-label="Basic example" class="polls">
                            <Button variant="secondary" onClick={getPolls}>All Polls</Button>
                            <Button variant="secondary" onClick={getUserPolls}>My Polls</Button>
                        </ButtonGroup>

                    </div>
                )}
                <ul className="polls">{polls}</ul>
            </Fragment>
        );
    }
}



export default connect(
    store => ({
        auth: store.auth,
        polls: store.polls,
    }),
    { getPolls, getUserPolls ,getCurrentPoll},
)(Polls);