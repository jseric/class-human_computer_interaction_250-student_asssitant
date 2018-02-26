import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';

import Home from './Components/Home.js'
import Courses from './Components/Courses.js'
import Timetable from './Components/Timetable.js'
import Settings from './Components/Settings.js'
import Login from './Components/Login.js'

import { Users } from './Data.js';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

    this.state = {
      isSignedIn: false,
      userIndex: -1,
      users: Users
    };
  }

  handleSignIn(id) {
    this.setState({
      isSignedIn: true,
      userIndex: id
    }, () => {
      window.location.replace("http://localhost:3000/#/");
    });

  }

  handleSignOut() {
    this.setState({
      isSignedIn: false,
      userIndex: -1
    }, () => {
      window.location.replace("http://localhost:3000/#");
    });
  }

  render() {
    let courseComponent = <Courses userId={this.state.userIndex} />;
    let homeComponent = <Home />;

    let homeCourseComponent = this.state.isSignedIn ? courseComponent : homeComponent;

    return (
      <HashRouter>
        <div className="app">
          <Header isSignedIn={this.state.isSignedIn}
                  onSignOut={this.handleSignOut} />

          <div className="content">
            <Route exact path="/" render={() => (homeCourseComponent)} />

            <Route path="/courses" render={() => (homeCourseComponent)} />

            <Route path="/timetable" component={Timetable} />

            <Route path="/settings" component={Settings} />

            <Route path='/login' render={() => (
              <Login isSignedIn={this.state.isSignedIn}
                     users={this.state.users}
                     onSignIn={this.handleSignIn} />
             )}/>
          </div>

          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
