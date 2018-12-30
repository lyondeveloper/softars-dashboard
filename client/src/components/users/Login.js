import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputGroup from "../common/TextInputGroup";
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import "../../css/Login.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/projects");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    //Calling the loginUser function from the action
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group form-group-login">
                <h4 className="text-primary">
                  <Link to="/register">
                    <i className="fas fa-arrow-circle-left" /> Back to Register
                  </Link>
                </h4>
                <h1 className="display-4 text-center">Sign In</h1>
                <h4 className="lead text-center">Use your SoftArs account</h4>
                <form onSubmit={this.onSubmit}>
                  <TextInputGroup
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <input
                    className="btn btn-login mt-4 btn-block btn-primary"
                    type="submit"
                    value="Log In"
                  />
                  <h4 className="lead text-center mt-5">
                    Using your social medias <br />
                    <br />
                    <i className="fab fa-twitter social-icon social-icon-login" />
                    <i className="fab fa-facebook social-icon social-icon-login" />
                    <i className="fab fa-google social-icon social-icon-login" />
                  </h4>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
