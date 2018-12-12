import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputGroup from "../common/TextInputGroup";
import { loginUser } from "../../actions/authActions";

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
    const { errors, email, password } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center text-primary mt-4">
                  Log in using your SoftArs account information...
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextInputGroup
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  <input
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                    type="submit"
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
