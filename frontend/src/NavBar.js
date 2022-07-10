import React, { Component } from 'react';
import CurrentUserContext from './users/CurrentUserContext';
import Container from 'react-bootstrap/Container';

import {
  Nav, Navbar
} from 'react-bootstrap';

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
        <div className='NavBar'>
          <Navbar expand="lg">
            <Container>
              <Navbar.Brand href="/" className='navbrand'>Melody Glow</Navbar.Brand>
              {/* <Nav className="me-auto"> */}
                <Nav.Link href="/genre" className="navbar">
                  Genres
                </Nav.Link>

                <Nav.Link href="/playlist" className="navbar">
                  Playlist
                </Nav.Link>

                <Nav.Link
                  href="/favorite" className="navbar">
                  Your Music
                </Nav.Link>

                <Nav.Link
                  href="/logout" className="navbar" onClick={this.logout}>
                  Log out <b>{currentUser}</b>
                </Nav.Link>
              {/* </Nav> */}
            </Container>
          </Navbar>
        </div>
      );
    } else {
      return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/" className="navbrand">
            Melody Glow
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/login">
              Log in
            </Nav.Link>

            <Nav.Link href="/signup">
              Sign up
            </Nav.Link>
          </Nav>
        </Navbar>
      );
    }
  }
}

export default NavBar;
