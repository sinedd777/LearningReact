import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../index.css'
import { createPoll } from '../store/actions';
import {Alert} from "reactstrap";

class CreatePoll extends Component {
    visibility=false;
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            options: ['', ''],
        };
        this.handleChange = this.handleChange.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addAnswer() {
        this.setState({ options: [...this.state.options, ''] });
    }

    handleAnswer(e, index) {
        const options = [...this.state.options];
        options[index] = e.target.value;
        this.setState({ options });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createPoll(this.state);
        this.toggle();
    }

    toggle(){
        this.visibility=!this.visibility;
    }

    render() {
        const options = this.state.options.map((option, i) => (
            <Fragment key={i}>
                <br/>
                <label className="form-label">Option</label>
                <input
                    className="form-input"
                    type="text"
                    required="required"
                    value={option}
                    onChange={e => this.handleAnswer(e, i)}
                />
            </Fragment>
        ));

        return (
            <div>
            <Alert variant="success" isOpen={this.visibility} toggle={this.toggle.bind(this)}>Hi I am an alert</Alert>
            <form className="form" onSubmit={this.handleSubmit}>
                <label className="form-label" htmlFor="question">
                    Question
                </label>
                <input
                    className="form-input"
                    type="text"
                    required="required"
                    name="question"
                    value={this.state.question}
                    onChange={this.handleChange}
                />

                <div className="container">
                        {options}
                </div>
                <div className="buttons_center">
                    <button className="btn btn-primary" type="button" onClick={this.addAnswer}>
                        Add options
                    </button>
                    <button className="btn btn-secondary" type="submit" onClick={this.toggle.bind(this)}>
                        Submit
                    </button>
                </div>
            </form>
            </div>
        );
    }
}

export default connect(() => ({}), { createPoll })(CreatePoll);

