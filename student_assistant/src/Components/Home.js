import React, { Component } from 'react';

import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Styles/Home.css';

class Home extends Component {
  constructor() {
    super();

    this.handleSignUpClick = this.handleSignUpClick.bind(this);
  }

  handleSignUpClick(e) {
    alert("Sign up is currently not available");
  }

  render() {
    return (
      <div className="home">
        <Jumbotron className="jumbotron" >
      		<h2>Welcome to</h2>

          <h1><b>Student Assistant</b></h1>

      		<p id="homeInfoP" >
      			Why keep all your class information in your head,
            when you can have an app do it for you!
      		</p>

      		<p>
      			<Button className="homeButton"
                    bsStyle="primary"  bsSize="large"
                    onClick={this.handleSignUpClick}>
              Sign Up
            </Button>

            <LinkContainer to="/login">
              <Button className="homeButton" id="signInButton"
                      bsStyle="success"  bsSize="large">
                Sign In
              </Button>
            </LinkContainer>
      		</p>
      	</Jumbotron>
      </div>
    );
  }
}

export default Home;
