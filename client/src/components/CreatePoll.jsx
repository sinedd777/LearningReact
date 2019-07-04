import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../store/actions';
import Redirect from "react-router-dom/es/Redirect";
import '../styles/createpoll.css'
import Alert from "reactstrap/es/Alert";
import Button from "reactstrap/es/Button";

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            options: ['', ''],
            visible:false
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

    // removeAnswer(){
    //     const array = [...this.state.options]; // make a separate copy of the array
    //     const index = array.indexOf();
    //     if (index !== -1) {
    //         array.splice(index, 1);
    //         this.setState({people: array});
    //     }    }

    handleAnswer(e, index) {
        const options = [...this.state.options];
        options[index] = e.target.value;
        this.setState({ options });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createPoll(this.state);
        this.toggle()
    }
    toggle() {
        this.setState({
            visible: !this.state.visible
        })
    }


    render() {

        const options = this.state.options.map((option, i) => (
            <Fragment key={i}>
                <input
                    className="form-control mb-2 mr-sm-2"
                    type="text"
                    required="required"
                    value={option}
                    onChange={e => this.handleAnswer(e, i)}
                    placeholder="Option"
                />
            </Fragment>
        ));
        return (
            <div>
                    <br/>
                <div className="alert1">
                    <Alert color="primary" isOpen={this.state.visible} toggle={this.toggle.bind(this)}>Success! Want to add Another?</Alert>
                </div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <br/>
                        <table className="table">
                            <tr>
                                <input
                    className="form-control mb-2 mr-sm-2"
                    type="text"
                    required="required"
                    name="question"
                    value={this.state.question}
                    onChange={this.handleChange}
                    placeholder="Question"
                    />
                        </tr>
                <tr>
                <div>
                        {options}
                </div>
                </tr>
                    </table>
                <div className="buttons_center">
                    <Button block={true} color="primary" onClick={this.addAnswer}>Add Options</Button>{' '}
                    <Button block={true} color="info" type="submit">Submit</Button>{' '}
                </div>
                </form>
            </div>
        );
    }
}

export default connect(() => ({}), { createPoll })(CreatePoll);

