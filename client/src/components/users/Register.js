import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {registerUser} from '../../actions/authActions';
import TextInputGroup from '../common/TextInputGroup';
import {connect} from 'react-redux';

class Register extends Component {
  constructor() {
    super();
    this.state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit(e) {
    e.preventDefault();

    //Creating the data
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    this.props.registerUser(newUser, this.props.history);
      
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <h1 className="display-4 text-center">Create Account</h1>
                <p className="lead text-center">
                  Type your information to create an account
                </p>

                <form noValidate onSubmit={this.onSubmit}>
                
                  <TextInputGroup 
                  type='text'
                  name='name'
                  placeholder="Name"
                  onChange={this.onChange}
                  error={errors.name}
                  value={this.state.name}
                  />

                  <TextInputGroup 
                  type='email'
                  name='email'
                  placeholder="Email"
                  onChange={this.onChange}
                  error={errors.email}
                  value={this.state.email}
                  />

                  <TextInputGroup 
                  type='password'
                  name='password'
                  placeholder="Password"
                  onChange={this.onChange}
                  error={errors.password}
                  value={this.state.password}
                  />

                  <TextInputGroup 
                  placeholder="Confirm Password"
                  type='password'
                  name='password2'
                  onChange={this.onChange}
                  error={errors.password2}
                  value={this.state.password2}
                  />
                  
                  <input value='Submit' type='submit' className="btn mt-4 btn-block btn-primary"/>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(Register);