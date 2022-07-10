import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './routes/Routes';
import MelodyApi from './api';
import { decode } from "jsonwebtoken";
import CurrentUserContext from './users/CurrentUserContext';
import "./App.css";
import galaxyImage from "./purple.jpeg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      loaded: false,
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async componentDidMount() {
    let currentUser = await this.getCurrentUser();
    if (currentUser !== undefined) {
      this.setState({
        currentUser: currentUser.username,
        loaded: true,
      });
    } else {
      this.setState({
        currentUser: null,
        loaded: true,
      });
    }
  }

  async getCurrentUser() {
    try {
      let token = localStorage.getItem("token");
      let { username } = decode(token);
      let currentUser = await MelodyApi.getUser(username);
      return currentUser;
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <CurrentUserContext.Provider value={this.state}>
          <div className='App' style={{ backgroundImage: `url(${galaxyImage})` }}>
            <BrowserRouter>
              <NavBar />
              <main>
                <Switch>
                  <Routes render={(props) => <Route {...props} />} />
                </Switch>
              </main>
            </BrowserRouter>
          </div>
        </CurrentUserContext.Provider>
      )
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default App;
