import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInputGroup from '../common/TextInputGroup';
import SelectListGroup from '../common/SelectListGroup';
import Spinner from '../layout/Spinner';
import { addProject } from '../../actions/projectActions';
import { connect } from 'react-redux';

import '../../css/AddProject.css';

class AddProject extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            description: '',
            type: '',
            client: '',
            url: '',
            date: '',
            errors: {}
        };

        this.onFileChange = this.onFileChange.bind(this);
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

        const formData = new FormData();

        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('url', this.state.url);
        formData.append('client', this.state.client);
        formData.append('type', this.state.type);
        formData.append('date', this.state.date);
        formData.append('image', this.state.file);

        this.props.addProject(formData, this.props.history);
    }

    onFileChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const typeOptions = [
            {
                label: 'Select the application type',
                value: 0
            },
            {
                label: 'Desktop App',
                value: 'Desktop App'
            },
            {
                label: 'Website',
                value: 'Website'
            },
            {
                label: 'Website App',
                value: 'Website App'
            },
            {
                label: 'Mobile App',
                value: 'Mobile App'
            }
        ];
        const { errors } = this.state;
        const { loading } = this.props.projects;

        let projectContent;

        if (loading) {
            projectContent = <Spinner />;
        } else {
            projectContent = (
                <div className='register'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <h1 className='display-4 text-center'>
                                        Add Project
                                    </h1>
                                    <h4 className='lead text-center'>
                                        Type the project's data
                                    </h4>
                                    <form onSubmit={this.onSubmit}>
                                        <TextInputGroup
                                            name='title'
                                            placeholder='Title'
                                            onChange={this.onChange}
                                            value={this.state.title}
                                            error={errors.title}
                                        />
                                        <TextInputGroup
                                            name='description'
                                            placeholder='Description'
                                            onChange={this.onChange}
                                            value={this.state.description}
                                            error={errors.description}
                                        />
                                        <TextInputGroup
                                            name='url'
                                            placeholder='Url'
                                            onChange={this.onChange}
                                            value={this.state.url}
                                            error={errors.url}
                                        />
                                        <TextInputGroup
                                            name='client'
                                            placeholder='Client'
                                            onChange={this.onChange}
                                            value={this.state.client}
                                            error={errors.client}
                                        />
                                        <SelectListGroup
                                            name='type'
                                            placeholder='Type'
                                            options={typeOptions}
                                            onChange={this.onChange}
                                            value={this.state.type}
                                            error={errors.type}
                                        />
                                        <TextInputGroup
                                            type='date'
                                            name='date'
                                            placeholder='Date'
                                            onChange={this.onChange}
                                            value={this.state.date}
                                            error={errors.date}
                                        />

                                        <input
                                            type='file'
                                            name='image'
                                            placeholder='Image'
                                            onChange={this.onFileChange}
                                            error={errors.image}
                                        />

                                        <input
                                            className='btn mt-4 btn-block btn-primary'
                                            type='submit'
                                            value='Create'
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return projectContent;
    }
}

//Setting up the prop types to make them required
AddProject.propTypes = {
    addProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
};

//Mapping the state to props to access them globally with this.props
const mapStateToProps = state => ({
    projects: state.projects,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addProject }
)(AddProject);
