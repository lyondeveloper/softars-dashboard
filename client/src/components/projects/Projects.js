import React, { Component } from "react";
import PropTypes from "prop-types";
import Project from "./Project";
import { getProjects } from "../../actions/projectActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Projects extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props;

    let projectContent;

    if (projects.length > 0) {
      projectContent = (projects.map(project => (
        <Project key={project._id} project={project} />
      )));
    } else {
      projectContent = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>No projects found...</h4>
              <Link to="/projects/add">
                {" "}
                Click here to create a new project{" "}
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return projectContent;
  }
}

Projects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  projects: state.projects.projects
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Projects);
