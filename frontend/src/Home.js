import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from './users/CurrentUserContext';

class Home extends Component {

    static contextType = CurrentUserContext;

    render() {
        const { currentUser } = this.context;
        let homeContent = (
            <div>
                    <h1>MelodyGlow</h1>
                    <p>Where words fail, music speaks - Hans Christian Andersen</p>

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
                <div>
                    <h1>MelodyGlow</h1>
                    <p>Where words fail, music speaks - Hans Christian Andersen</p>
                    <h5>Welcome Back, {currentUser}</h5>
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
