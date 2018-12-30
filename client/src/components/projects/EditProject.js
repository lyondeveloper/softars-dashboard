import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextInputGroup from "../common/TextInputGroup";
import { getProject, editProject } from "../../actions/projectActions";
import isEmpty from "../../validation/is-empty";

class EditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      type: "",
      date: "",
      url: "",
      client: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //Checking if there are any errors
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const { project } = nextProps.projects;

    if (nextProps.projects.project) {
      //Checking if the inputs are empty, if is true it will be a empty string, else it will have their respective values
      project.title = !isEmpty(project.title) ? project.title : "";
      project.description = !isEmpty(project.description)
        ? project.description
        : "";
      project.type = !isEmpty(project.type) ? project.type : "";
      project.date = !isEmpty(project.date) ? project.date : "";
      project.url = !isEmpty(project.url) ? project.url : "";
      project.client = !isEmpty(project.client) ? project.client : "";

      //Setting the state in the inputs
      this.setState({
        title: project.title,
        description: project.description,
        type: project.type,
        date: project.date,
        url: project.url,
        client: project.client
      });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getProject(id);
  }

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props.match.params;

    const newData = {
      title: this.state.title,
      description: this.state.description,
      type: this.state.type,
      url: this.state.url,
      client: this.state.client,
      date: this.state.date
    };

    this.props.editProject(id, newData);

    this.props.history.push("/projects");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <h1 className="display-4 text-center">Edit Project</h1>
                <h4 className="lead text-center">
                  Type the project's new data
                </h4>
                <form onSubmit={this.onSubmit}>
                  <TextInputGroup
                    name="title"
                    placeholder="Title"
                    onChange={this.onChange}
                    value={this.state.title}
                    error={errors.title}
                  />
                  <TextInputGroup
                    name="description"
                    placeholder="Description"
                    onChange={this.onChange}
                    value={this.state.description}
                    error={errors.description}
                  />
                  <TextInputGroup
                    name="url"
                    placeholder="Url"
                    onChange={this.onChange}
                    value={this.state.url}
                    error={errors.url}
                  />
                  <TextInputGroup
                    name="client"
                    placeholder="Client"
                    onChange={this.onChange}
                    value={this.state.client}
                    error={errors.client}
                  />
                  <TextInputGroup
                    type="text"
                    name="date"
                    placeholder="Type"
                    onChange={this.onChange}
                    value={this.state.type}
                    error={errors.type}
                  />
                  <TextInputGroup
                    type="date"
                    name="date"
                    placeholder="Date"
                    onChange={this.onChange}
                    value={this.state.date}
                    error={errors.date}
                  />

                  <input
                    className="btn mt-4 btn-block btn-primary"
                    type="submit"
                    value="Update"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProject.propTypes = {
  editProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  projects: state.projects,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProject, editProject }
)(withRouter(EditProject));
