import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from './users/CurrentUserContext';

import {
    Nav, Navbar, NavbarBrand,
} from 'reactstrap';

class NavBar extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.logout = this.logout.bind(this);
    }

    static contextType = CurrentUserContext;

    logout() {
        localStorage.removeItem("token");
        document.location.href = "/";
    }

    render() {
        const { currentUser } = this.context;
        console.log({ currentUser });
        if (currentUser) {
          return (
            <Navbar bg="light" expand="lg">
              <NavLink exact to="/" className="navbar-brand">
                Melody Glow
              </NavLink>
              <Nav>
                <NavLink exact to="/genre" className="navbar">
                  Genres
                </NavLink>

                <NavLink exact to="/playlist" className="navbar">
                  Playlist
                </NavLink>

                <NavLink
                  exact to="/favorite" className="navbar">
                  Your Music
                </NavLink>

                <NavLink
                  exact to="/logout" className="navbar" onClick={this.logout}>
                  Log out "{currentUser}"
                </NavLink>
              </Nav>
            </Navbar>
          );
        } else {
          return (
            <Navbar bg="light" expand="lg">
              <NavbarBrand exact to="/" className="navbar-brand">
                Melody Glow
              </NavbarBrand>
              <Nav>
                <NavLink exact to="/login">
                  Log in
                </NavLink>

                <NavLink exact to="/signup">
                  Sign up
                </NavLink>
              </Nav>
            </Navbar>
          );
        }
      }
    }

    export default NavBar;
