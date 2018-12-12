import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { getProject } from "../../actions/projectActions";

class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  render() {
    const { project } = this.props.projects;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  {" "}
                  {project.description}{" "}
                </h5>
                <div className="card-text"> {project.description} </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"> {project.type} </li>
                  <li className="list-group-item"> {project.url}</li>
                  <li className="list-group-item"> {project.client}</li>
                  <li className="list-group-item"> {project.date} </li>
                  <li className="list-group-item">
                    <Moment format="YYYY/MM/DD">{this.state.date}</Moment>
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
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProject }
)(Project);
