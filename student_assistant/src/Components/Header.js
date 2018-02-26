import React, { Component } from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  handleSignOutClick(e) {
    this.props.onSignOut();
  }

  render() {
    let signInButton = () => {
      if(this.props.isSignedIn) { //Sign out
        return (
          <NavItem eventKey={2} href="#"
                   onClick={this.handleSignOutClick.bind(this)} >
            Sign Out
          </NavItem>
        );
      }
      else {
        return(
          <LinkContainer to="/login" >
            <NavItem eventKey={2} >
              Sign In
            </NavItem>
          </LinkContainer>
        );
      }
    };

    return (
      <div className="header">
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to="/">
                <a href="/">Student Assistant</a>
              </LinkContainer>

            </Navbar.Brand>

            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/courses">
                <NavItem eventKey={1}>
                  Courses
                </NavItem>
              </LinkContainer>

              <LinkContainer to="/timetable">
                <NavItem eventKey={2}>
                  Timetable
                </NavItem>
              </LinkContainer>

            </Nav>
            <Nav pullRight>
              <LinkContainer to="/settings">
                <NavItem eventKey={1}>
                  Settings
                </NavItem>
              </LinkContainer>

              {signInButton()}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
