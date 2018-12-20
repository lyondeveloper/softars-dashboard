import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { getProject, deleteProject } from "../../actions/projectActions";

class Project extends Component {
  onDeleteClick(id) {
    if (window.confirm("Are you sure? This action can NOT be undone")) {
      this.props.deleteProject(id);
    }
  }

  render() {
    const { project } = this.props;
    const { _id } = this.props.project;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card bg-blue">
              <i
                className="fas fa-times"
                style={{ cursor: "pointer", float: "right", color: "red" }}
                onClick={this.onDeleteClick.bind(this, _id)}
              />
              <Link to={`/projects/edit/${_id}`}>
                <i
                  className="fas fa-pencil-alt"
                  style={{ cursor: "pointer", float: "right", color: "green" }}
                />
              </Link>
              <div className="card-body mt-4">
                <h5 className="card-title text-primary"> {project.title} </h5>
                <div className="card-text"> {project.description} </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"> {project.type} </li>
                  <li className="list-group-item"> {project.url}</li>
                  <li className="list-group-item"> {project.client}</li>
                  <li className="list-group-item">
                    <Moment format="YYYY/MM/DD">{project.date}</Moment>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteProject, getProject }
)(Project);
