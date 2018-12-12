import React, { Component } from "react";
import PropTypes from "prop-types";
import Project from "./Project";
import { getProjects } from "../../actions/projectActions";
import { connect } from "react-redux";

class Projects extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props.projects;

    let projectContent;

    if (projects.length > 0) {
      projectContent = projects.map(project => (
        <Project key={project._id} project={project} />
      ));
    } else {
      projectContent = <h4>No projects found...</h4>;
    }

    return projectContent;
  }
}

Projects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Projects);
