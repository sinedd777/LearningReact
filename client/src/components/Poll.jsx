import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

import { vote } from '../store/actions';
import { color } from '../services/color';

import '../styles/polls.css'

const Poll = ({ poll, vote }) => {
    const answers =
        poll.options &&
        poll.options.map(option => (
            <button
                onClick={() => vote(poll._id, { answer: option.option })}
                className="btn btn-danger"
                key={option._id}>
                {option.option}
            </button>
        ));

    const data = poll.options&&{
        labels: poll.options.map(option => option.option),
        datasets: [
            {
                label: poll.question,
                backgroundColor: poll.options.map(option => color()),
                borderColor: '#323643',
                data: poll.options.map(option => option.votes),
            },
        ],
    };

    return (
        <div className="">
            <table >
                <tr>
                    <th>
                    <h3 className="poll-title">{poll.question}</h3></th>
                </tr>
            </table>
            <br/>
            <div className="centerbutton">{answers}</div>
            <br/>
            {poll.options&&<Pie data={data} />}
            </div>
    );
};

export default connect(
    store => ({
        poll: store.currentPoll,
    }),
    { vote },
)(Poll);