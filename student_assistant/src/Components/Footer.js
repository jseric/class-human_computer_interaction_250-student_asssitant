import React, { Component } from 'react';

import './Styles/Footer.css';

class Footer extends Component {
  constructor() {
    super();

    this.state = {
      name: "Josip Seric",
      mail: "josip.seric@icloud.com",
      year: "2018"
    }
  }

  render() {
    return(
      <div className="footer">
          <div className="footer-copyright">
              <div className="container-fluid">
                  © {this.state.year} Copyright:  {this.state.name}  ({this.state.mail})
              </div>
          </div>
      </div>
    );
  }
}

export default Footer;
