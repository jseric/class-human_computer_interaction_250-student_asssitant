import React, { Component } from 'react';

import { Form, FormGroup, Col, ControlLabel,
         FormControl, Button, Alert } from 'react-bootstrap';

import './Styles/Login.css';
import Image01 from './Images/image01.png';

class Login extends Component {
  constructor() {
    super();

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);

    this.state = {
      showErrMsg: false
    };
  }

  handleSubmit(e) {
    let userIndex = -1;

    //Submitted data
    let userName = this.username.value;
    let password = this.password.value;

    //Database data
    let users = this.props.users;

    for(var i = 0; i < this.props.users.length; i++) {
      if(userName === users[i].username &&
         password === users[i].password) {
        userIndex = i;
        break;
      }
    }

    if(userIndex >= 0) {  //Login successful
      this.props.onSignIn(userIndex);
    }
    else {
      this.setState({
        showErrMsg: true
      });
    }

    e.preventDefault();
  }

  handleDismiss(e) {
    this.setState({
      showErrMsg: false
    });

    e.preventDefault();
  }

  componentDidMount() {
    this.username.focus();
  }

  render() {
    let errorAlert = () => {
      if(this.state.showErrMsg) {
        return (
          <Alert className="errAlert" bsStyle="danger" onDismiss={this.handleDismiss}>
            <h4>Oh snap! You got an error!</h4>
            <p>
              The user name and the password don't match! Please try again!
            </p>
            <p>
              <Button bsStyle="danger" onClick={this.handleDismiss}>Hide Alert</Button>
            </p>
          </Alert>
       );
      }
   };

    return (
      <div className="login">
        {errorAlert()}

        <Form horizontal id="loginForm"
              onSubmit={this.handleSubmit}>
      		<FormGroup controlId="formHorizontalText">
      			<Col componentClass={ControlLabel} sm={2}>
      				<p>User Name</p>
      			</Col>

      			<Col sm={10} className="inputForm">
      				<FormControl type="text" placeholder="Username"
                           inputRef={ref => { this.username = ref; }} />
      			</Col>
      		</FormGroup>

      		<FormGroup controlId="formHorizontalPassword">
      			<Col componentClass={ControlLabel} sm={2}>
      				<p>Password</p>
      			</Col>

      			<Col sm={10} className="inputForm">
      				<FormControl type="password" placeholder="Password"
                           inputRef={ref => { this.password = ref; }} />
      			</Col>
      		</FormGroup>

      		<FormGroup>
      			<Col smOffset={2} sm={10}>
      				<Button bsStyle="success" type="submit">Sign in</Button>
      			</Col>
      		</FormGroup>
      	</Form>

        <img src={Image01} alt="eLearning" width="20px" height="20px"/>

      </div>
    );
  }
}

export default Login;
