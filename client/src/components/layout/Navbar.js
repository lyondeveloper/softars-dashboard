import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import "../../css/Navbar.css";
import logo from "../../img/logo-softars.b4151b4c.svg";
import {
    clearCurrentProfile,
    getProfileByHandle
} from "../../actions/profileActions";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(e) {
        e.preventDefault();

        this.props.logoutUser();
        this.props.clearCurrentProfile();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const { profile } = this.props.profiles;

        let navbarLinks;

        if (!isAuthenticated) {
            navbarLinks = (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a
                        href="http://softars.com"
                        rel="noopener noreferrer"
                        className="navbar-brand text-secondary"
                        target="_blank"
                    >
                        <img src={logo} alt="SoftArs" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain"
                        aria-controls="navbarMain"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    {" "}
                                    Home{" "}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    {" "}
                                    Sign Up{" "}
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="login" className="nav-link">
                                    {" "}
                                    Log In{" "}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        } else {
            navbarLinks = (
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <a
                        href="http://softars.com"
                        rel="noopener noreferrer"
                        className="navbar-brand text-secondary"
                        target="_blank"
                    >
                        <img src={logo} alt="SoftArs" />
                    </a>
                    <Link to="/" className="navbar-brand text-secondary">
                        Home
                    </Link>{" "}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain"
                        aria-controls="navbarMain"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    {" "}
                                    Dashboard{" "}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/projects" className="nav-link">
                                    {" "}
                                    Projects{" "}
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#!"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Account
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <Link
                                        className="dropdown-item"
                                        to={`/profile/${profile.handle}`}
                                    >
                                        My Profile
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <button
                                        className="dropdown-item"
                                        onClick={this.onLogoutClick}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        }

        return navbarLinks;
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profiles: state.profiles,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile, getProfileByHandle }
)(Navbar);
