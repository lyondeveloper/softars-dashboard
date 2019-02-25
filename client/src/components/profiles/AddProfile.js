import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextInputGroup from '../common/TextInputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createOrEditProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';

import '../../css/AddProfile.css';

class AddProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            handle: '',
            profession: '',
            occupation: '',
            website: '',
            country: '',
            bio: '',
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onFileChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('handle', this.state.handle);
        formData.append('bio', this.state.bio);
        formData.append('website', this.state.website);
        formData.append('country', this.state.country);
        formData.append('occupation', this.state.occupation);
        formData.append('profession', this.state.profession);
        formData.append('image', this.state.file);

        //Using the action to create a profile, then redirecting to the profile
        this.props.createOrEditProfile(formData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const options = [
            {
                label: 'Select your current occupation',
                value: 0
            },
            {
                label: 'Developer',
                value: 'Developer'
            },
            {
                label: 'Social Media',
                value: 'Social Media'
            }
        ];

        const { errors } = this.state;

        return (
            <div className='add-profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='form-group'>
                                <h1 className='display-4 text-center'>
                                    Create Profile
                                </h1>
                                <h4 className='lead text-center'>
                                    Type your profile's information
                                </h4>
                                <form onSubmit={this.onSubmit}>
                                    <TextInputGroup
                                        name='handle'
                                        placeholder='Username'
                                        info='This username must be unique'
                                        value={this.state.handle}
                                        onChange={this.onChange}
                                        error={errors.handle}
                                    />
                                    <TextInputGroup
                                        name='profession'
                                        placeholder='Profession'
                                        info='Separate the values by an space and a comma, Ej: Computer Engineer, Administrator'
                                        value={this.state.profession}
                                        onChange={this.onChange}
                                        error={errors.profession}
                                    />
                                    <SelectListGroup
                                        name='occupation'
                                        info='This is your current position in the company'
                                        options={options}
                                        value={this.state.occupation}
                                        onChange={this.onChange}
                                        error={errors.occupation}
                                    />
                                    <TextInputGroup
                                        name='website'
                                        placeholder='Website'
                                        value={this.state.website}
                                        onChange={this.onChange}
                                        error={errors.website}
                                    />
                                    <TextInputGroup
                                        name='country'
                                        placeholder='Country'
                                        value={this.state.country}
                                        onChange={this.onChange}
                                        error={errors.country}
                                    />
                                    <TextInputGroup
                                        name='bio'
                                        placeholder='Bio'
                                        value={this.state.bio}
                                        onChange={this.onChange}
                                        error={errors.bio}
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
                                        value='Create Profile'
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
AddProfile.propTypes = {
    createOrEditProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

//Mapping the state to props to access them globally with this.props
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createOrEditProfile }
)(withRouter(AddProfile));
