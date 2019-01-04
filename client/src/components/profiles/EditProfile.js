import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextInputGroup from "../common/TextInputGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  getCurrentProfile,
  createOrEditProfile
} from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import Spinner from "../layout/Spinner";

import "../../css/AddProfile.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: "",
      profession: "",
      occupation: "",
      bio: "",
      website: "",
      country: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    //Checking if there are any errors
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profiles.profile) {
      //Checking if the inputs are empty, if is true it will be a empty string, else it will have their respective values

      const profile = nextProps.profiles.profile;
      const professionJoined = profile.profession.join(", ");

      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.occupation = !isEmpty(profile.occupation)
        ? profile.occupation
        : "";
      profile.country = !isEmpty(profile.country) ? profile.country : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      //Setting the state in the inputs
      this.setState({
        handle: profile.handle,
        website: profile.website,
        bio: profile.bio,
        profession: professionJoined,
        occupation: profile.occupation,
        country: profile.country
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const data = {
      handle: this.state.handle,
      website: this.state.website,
      occupation: this.state.occupation,
      profession: this.state.profession,
      country: this.state.country,
      bio: this.state.bio
    };

    this.props.createOrEditProfile(data, this.props.history);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { loading } = this.props.profiles;

    const { errors } = this.state;

    const options = [
      {
        label: "Select your current occupation",
        value: 0
      },
      {
        label: "Developer",
        value: "Developer"
      },
      {
        label: "Social Media",
        value: "Social Media"
      }
    ];

    let profileContent;

    if (loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="add-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <h1 className="display-4 text-center">Edit Profile</h1>
                  <h4 className="lead text-center">
                    Type your new profile's data
                  </h4>
                  <form onSubmit={this.onSubmit}>
                    <TextInputGroup
                      name="handle"
                      placeholder="Handle"
                      info="This handle must be unique"
                      value={this.state.handle}
                      onChange={this.onChange}
                      error={errors.handle}
                    />
                    <TextInputGroup
                      name="profession"
                      placeholder="Profession"
                      info="Separate the values by an space and a comma, Ej: Computer Engineer, Administrator"
                      value={this.state.profession}
                      onChange={this.onChange}
                      error={errors.profession}
                    />
                    <SelectListGroup
                      name="occupation"
                      info="This is your current position in the company"
                      options={options}
                      value={this.state.occupation}
                      onChange={this.onChange}
                      error={errors.occupation}
                    />
                    <TextInputGroup
                      name="website"
                      placeholder="Website"
                      value={this.state.website}
                      onChange={this.onChange}
                      error={errors.website}
                    />
                    <TextInputGroup
                      name="country"
                      placeholder="Country"
                      value={this.state.country}
                      onChange={this.onChange}
                      error={errors.country}
                    />
                    <TextInputGroup
                      name="bio"
                      placeholder="Bio"
                      value={this.state.bio}
                      onChange={this.onChange}
                      error={errors.bio}
                    />

                    <input
                      className="btn mt-4 btn-block btn-primary"
                      type="submit"
                      value="Edit Profile"
                    />
                  </form>
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

EditProfile.propTypes = {
  createOrEditProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profiles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, createOrEditProfile }
)(withRouter(EditProfile));
