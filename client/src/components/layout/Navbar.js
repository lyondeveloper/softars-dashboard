import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/Navbar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { logoutUser, deleteUser } from "../../actions/authActions";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor() {
    super();

    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onDeleteAccountClick = this.onDeleteAccountClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
  }

  onDeleteAccountClick(e) {
    e.preventDefault();

    this.props.deleteUser();

    if (localStorage.jwtToken) {
      localStorage.removeItem("jwtToken");
    }
  }

  render() {
    const { branding } = this.props;
    const { isAuthenticated } = this.props.auth;

    let navbarLinks;

    if (!isAuthenticated) {
      navbarLinks = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="http://softars.com" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        </ul>
      );
    } else {
      navbarLinks = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="http://softars.com" target="_blank" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/account" className="nav-link">
              Account
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to=""
              onClick={this.onDeleteAccountClick}
              className="nav-link"
            >
              Delete Account
            </Link>
          </li>
          <li className="nav-item">
            <Link to="" onClick={this.onLogoutClick} className="nav-link">
              Log Out
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light main-navbar">
        <div className="container">
          <span className="navbar-brand">{branding}</span>
          {navbarLinks}
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  branding: "SoftArs Dashboard"
};

Navbar.propTypes = {
  branding: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, deleteUser }
)(Navbar);
