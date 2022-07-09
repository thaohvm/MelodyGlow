import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from './users/CurrentUserContext';
import './Home.css'

class Home extends Component {

    static contextType = CurrentUserContext;

    render() {
        const { currentUser } = this.context;
        let homeContent = (
            <div className='home'>
                    <h1>Melody Glow</h1>
                    <p>where words fail, music speaks - Hans Christian Andersen</p>

                <Link to="/login">
                    <button className='btn btn-primary'>
                        Log in</button>
                </Link>
                <Link to="/signUp">
                    <button className='btn btn-primary'>
                        Sign up</button>
                </Link>
            </div>
        )

        if (currentUser) {
            homeContent = (
                <div className='home'>
                    <h1>Melody Glow</h1>
                    <h4 className='quote'>where words fail, music speaks - Hans Christian Andersen</h4>
                    <h4><b>Welcome back, {currentUser}</b></h4>
                </div>
            )
        }

        return (
            <div>
                {homeContent}
            </div>
        );

    }
}

export default Home;
