import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextInputGroup from "../common/TextInputGroup";
import { getProject, editProject } from "../../actions/projectActions";

class EditProject extends Component {
  state = {
    title: "",
    description: "",
    type: "",
    date: "",
    url: "",
    client: ""
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { title, description, type, url, client, date } = nextProps.projects;

    this.setState({
      title,
      description,
      type,
      date,
      url,
      client
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getProject(id);
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, description, type, url, client, date } = this.state;

    const { id } = this.props.match.params;

    const newData = {
      title,
      description,
      type,
      url,
      client,
      date
    };

    this.props.editProject(id, newData);

    this.props.history.push("/projects");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title, description, type, url, client, date } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Edit Project</h1>
              <p className="lead text-center">
                Type your information to edit a project
              </p>
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.onChange}
                />

                <TextInputGroup
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={this.onChange}
                />

                <TextInputGroup
                  name="url"
                  placeholder="URL"
                  value={url}
                  onChange={this.onChange}
                />

                <TextInputGroup
                  name="client"
                  placeholder="Client"
                  value={client}
                  onChange={this.onChange}
                />

                <TextInputGroup
                  name="type"
                  placeholder="Type"
                  value={type}
                  onChange={this.onChange}
                />

                <TextInputGroup
                  type="date"
                  name="date"
                  placeholder="Date"
                  value={date}
                  onChange={this.onChange}
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

EditProject.propTypes = {
  editProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.projects.project
});

export default connect(
  mapStateToProps,
  { getProject, editProject }
)(EditProject);
