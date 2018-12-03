import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/Navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    const { branding } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light main-navbar">
        <div className="container">
          <span className="navbar-brand">
            {branding}
            <div className="container">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  branding: "SoftArs Dashboard"
};

Navbar.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Navbar;
