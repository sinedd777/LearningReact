import React from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Polls from '../components/Polls';
import '../styles/homepage.css'

const HomePage = props =>(
    <div>
        <ErrorMessage/>
        <h3 className=""> Current Polls</h3>
        <br/>
        <Polls{...props}/>
    </div>);
export default HomePage;
