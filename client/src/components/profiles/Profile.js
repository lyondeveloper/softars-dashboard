import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import {
  getProfileByHandle,
  deleteAccount
} from "../../actions/profileActions";

import { connect } from "react-redux";

import "../../css/Profile.css";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  onDeleteClick(e) {
    e.preventDefault();

    this.props.deleteAccount();

    if (localStorage.jwtToken) {
      localStorage.removeItem("jwtToken");
    }
  }

  render() {
    const { profile, loading } = this.props.profiles;

    console.log(profile);

    // const firstName = profile.user.name.trim.split(" ")[0];

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-body bg-info text-white">
                  {/* Block 1 */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <img
                          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                      <div className="text-center">
                        <h1> {profile.user.name} </h1>
                        <div className="container container-buttons">
                          <button className="btn btn-warning">
                            Edit Account
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={this.onDeleteClick.bind(this)}
                          >
                            Delete Account
                          </button>
                        </div>
                        <h4 className="lead mt-4">
                          Currently Position At SoftArs
                        </h4>
                        <h4 className="profile-occupation mt-4">
                          {" "}
                          {profile.occupation}{" "}
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="bio">
                        {/* <h3 className="text-center">{firstName}'s Bio</h3> */}
                        <p className="lead mt-3 text-justify">{profile.bio}</p>
                      </div>
                    </div>
                  </div>
                  {/* Block 2 */}
                  <div className="row info">
                    <div className="col-md-4">
                      <h3 className="text-center">
                        Website
                        <p className="lead mt-4 text-center">
                          {profile.website}
                        </p>
                      </h3>
                    </div>
                    <div className="col-md-4">
                      <h3 className="text-center">
                        Profession
                        <p className="lead mt-4 text-center">
                          {profile.profession}
                        </p>
                      </h3>
                    </div>
                    <div className="col-md-4">
                      <h3 className="text-center">
                        Country
                        <p className="lead mt-4 text-center">
                          {profile.country}
                        </p>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return profileContent;
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profiles
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, deleteAccount }
)(Profile);
