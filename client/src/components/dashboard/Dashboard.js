import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profiles;

    let dashboardContent;

    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h3 className="lead text-center text-info">
              <Link to={`/profile/${profile.handle}`}> View Profile </Link>
            </h3>

            <span className="text-success">
              <Link to="/projects">Projects</Link>
            </span>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h3 className="lead text-center text-info">
              You have not setup a profile yet,{" "}
              <Link to="/profiles/create"> click here </Link> to create a
              profile
            </h3>

            <span className="text-success">
              <Link to="/projects">Projects</Link>
            </span>
          </div>
        );
      }
    }

    return <div className="text-center m-auto">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profiles,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
