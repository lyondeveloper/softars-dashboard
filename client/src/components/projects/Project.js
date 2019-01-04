import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getProject, deleteProject } from "../../actions/projectActions";

class Project extends Component {
  onDeleteProjectClick(id) {
    if (window.confirm("Are you sure? This action can NOT be undone")) {
      this.props.deleteProject(id);
    }
  }

  render() {
    const { project } = this.props;
    return (
      <tbody>
        <tr>
          <th>{project.title}</th>
          <th>{project.description}</th>
          <th>
            <Moment format="YYYY/MM/DD" value={project.date} />
          </th>

          <th> {project.client} </th>
          <th> {project.type} </th>
          <th>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <span className="link-text">Click here to visit</span>
            </a>
          </th>
        </tr>
        <tr>
          <Link to={`/projects/edit/${project._id}`}>
            <i className="fas fa-pencil-alt mr-3 text-warning" />
          </Link>
          <i
            className="fas fa-trash-alt"
            onClick={this.onDeleteProjectClick.bind(this, project._id)}
          />
        </tr>
      </tbody>
    );
  }
}

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteProject, getProject }
)(Project);
