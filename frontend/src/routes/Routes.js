import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpForm from '../users/SignUpForm';
import LoginForm from '../users/LoginForm';
import PrivateRoute from './PrivateRoute';
import Home from '../Home';
import GenreList from '../genre/GenreList';
import GenreDetails from '../genre/GenreDetails';
import PlaylistList from '../playlist/PlaylistList';
import PlaylistDetails from '../playlist/PlaylistDetails';
import MelodyApi from '../api';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        }
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.logout = this.logout.bind(this);
    }

    async signUp(data) {
        try {
            let token = await MelodyApi.signUp(data);
            localStorage.setItem("token", token);
            document.location.href = "/";
        } catch (err) {
            console.error("signUp failed", err);
            return { success: false, err }
        }
    }

    async login(data) {
        try {
            let token = await MelodyApi.login(data);
            localStorage.setItem("token", token);
            document.location.href = "/";
        } catch (err) {
            console.error("login failed", err);
            return { success: false, err }
        }
    }

    logout() {
        localStorage.removeItem("token");
        document.location.href = "/";
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/"
                        render={() => <Home />}
                    />
                    <Route exact path="/signup"
                        render={props => <SignUpForm handleSignUp={this.signUp} {...props} />}
                    />
                    <Route exact path="/login"
                        render={props => <LoginForm handleLogin={this.login} {...props} />}
                    />
                    <PrivateRoute path="/logout"
                        onClick={this.logout}
                    />
                    <PrivateRoute exact path="/genre"
                        render={props => <GenreList {...props} />}
                    />
                    <PrivateRoute exact path="/genre/:genre_id"
                        render={props => <GenreDetails {...props} />}
                    />
                    <PrivateRoute exact path="/playlist"
                        render={props => <PlaylistList {...props} />}
                    />
                    <PrivateRoute exact path="/playlist/:playlist_id"
                        render={props => <PlaylistDetails {...props} />}
                    />

                    {/* <PrivateRoute path="/favorite"
                    render={props => <Favorite {...props} />} /> */}
                    <Redirect to="/" />
                </Switch>
            </div>
        )
    }

}

export default Routes;
