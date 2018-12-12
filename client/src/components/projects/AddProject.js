import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInputGroup from "../common/TextInputGroup";
import { addProject } from "../../actions/projectActions";
import { connect } from "react-redux";

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

  onSubmit(e) {
    e.preventDefault();

    const newProject = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      client: this.state.client,
      type: this.state.type,
      date: this.state.date
    };

    this.props.addProject(newProject);

    this.setState({
      title: "",
      description: "",
      type: "",
      client: "",
      url: "",
      date: ""
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Add Project</h1>
              <p className="lead text-center">
                Type your information to create an account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <TextInputGroup
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />

                <TextInputGroup
                  name="url"
                  placeholder="URL"
                  value={this.state.url}
                  onChange={this.onChange}
                  error={errors.url}
                />

                <TextInputGroup
                  name="client"
                  placeholder="Client"
                  value={this.state.client}
                  onChange={this.onChange}
                  error={errors.client}
                />

                <TextInputGroup
                  name="type"
                  placeholder="Type"
                  value={this.state.type}
                  onChange={this.onChange}
                  error={errors.type}
                />

                <TextInputGroup
                  type="date"
                  name="date"
                  placeholder="Date"
                  value={this.state.date}
                  onChange={this.onChange}
                  error={errors.date}
                />

                <input
                  className="btn mt-4 btn-block btn-primary"
                  value="Create"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProject }
)(AddProject);
