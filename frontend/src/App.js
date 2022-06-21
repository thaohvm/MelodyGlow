import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './routes/Routes';
import MelodyApi from './api';
import { decode } from "jsonwebtoken";
import CurrentUserContext from './users/CurrentUserContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async componentDidMount() {
    let currentUser = await this.getCurrentUser();
    if (currentUser !== undefined) {
      this.setState({ currentUser: currentUser.username });
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

    return (
      <CurrentUserContext.Provider value={this.state}>
        <div className='App'>
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
  }
}

export default App;
