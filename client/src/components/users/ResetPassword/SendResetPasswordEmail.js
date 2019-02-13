import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendResetPasswordEmail } from '../../../actions/authActions';
import TextInputGroup from '../../common/TextInputGroup';

class SendResetPasswordEmail extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            console.log(nextProps.errors);
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            email: this.state.email
        };

        this.props.sendResetPasswordEmail(data, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className='send-email'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='form-group form-group-register'>
                                <h1 className='display-4 text-center'>
                                    Reset Password
                                </h1>
                                <h4 className='lead text-center'>
                                    Type your information to reset your password
                                </h4>
                                <form onSubmit={this.onSubmit}>
                                    <TextInputGroup
                                        name='email'
                                        placeholder='Email'
                                        value={this.state.email}
                                        error={errors.email}
                                        onChange={this.onChange}
                                    />
                                    <input
                                        className='btn btn-register mt-4 btn-block btn-primary'
                                        type='submit'
                                        value='Send'
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

SendResetPasswordEmail.propTypes = {
    auth: PropTypes.object.isRequired,
    sendResetPasswordEmail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { sendResetPasswordEmail }
)(withRouter(SendResetPasswordEmail));
