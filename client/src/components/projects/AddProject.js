import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../common/TextInputGroup";
import { addProject } from "../../actions/projectActions";
import { connect } from "react-redux";

import "../../css/AddProject.css";

class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
      type: "",
      client: "",
      url: "",
      date: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    //Creating the new project
    const newProject = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      client: this.state.client,
      type: this.state.type,
      date: this.state.date
    };

    this.props.addProject(newProject, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <h1 className="display-4 text-center">Add Project</h1>
                <h4 className="lead text-center">Type the project's data</h4>
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
                    name="type"
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
                    value="Create"
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

//Setting up the prop types to make them required
AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

//Mapping the state to props to access them globally with this.props
const mapStateToProps = state => ({
  project: state.project,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProject }
)(AddProject);
