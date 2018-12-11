import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="landing-body">
                <div className="jumbotron">
                  <h1 className="display-3 mb-4">SoftArs Dashboard</h1>
                  <p className="lead mb-5">
                    Welcome to the SoftArs Dashboard, if you have an account,
                    please press the Log In button, if you don't have an
                    account, please press the Sign Up button and create an
                    account.
                  </p>
                  <Link to="/register" className="btn btn-success">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-primary">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
