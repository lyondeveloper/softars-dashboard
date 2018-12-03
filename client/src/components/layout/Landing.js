import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div class="landing">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="landing-body">
                <div class="jumbotron">
                  <h1 class="display-3 mb-4">SoftArs Dashboard</h1>
                  <p class="lead mb-5">
                    Welcome to the SoftArs Dashboard, if you have an account,
                    please press the Log In button, if you don't have an
                    account, please press the Sign Up button and create an
                    account.
                  </p>
                  <Link to="/register" class="btn btn-success">
                    Sign Up
                  </Link>
                  <Link to="/login" class="btn btn-primary">
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
