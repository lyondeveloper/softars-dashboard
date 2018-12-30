import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../../css/Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      birthday: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    //Creating the data
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group form-group-register">
                <Link to="/">
                  <i className="fas fa-arrow-circle-left" /> Back to Home
                </Link>
                <h1 className="display-4 text-center">Sign Up</h1>
                <h4 className="lead text-center">
                  Type your information to create an account
                </h4>
                <form onSubmit={this.onSubmit}>
                  <TextInputGroup
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    error={errors.name}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={this.state.email}
                    error={errors.email}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    error={errors.password}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    type="password"
                    name="password2"
                    placeholder="Confirm Your Password"
                    value={this.state.password2}
                    error={errors.password2}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    type="date"
                    name="date"
                    placeholder="Birthday"
                    value={this.state.birthday}
                    error={errors.birthday}
                    onChange={this.onChange}
                  />
                  <input
                    className="btn btn-register mt-4 btn-block btn-primary"
                    type="submit"
                    value="Sign Up"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
