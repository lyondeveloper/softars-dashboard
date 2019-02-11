import React, { Component } from 'react';
import { resetPassword } from '../../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInputGroup from '../../common/TextInputGroup';

class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const { password } = this.state;

        const { token } = this.props.match.params;

        console.log(token);

        this.props.resetPassword(token, password, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className='reset-password'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='form-group form-group-register'>
                                <h1 className='display-4 text-center'>
                                    Reset Password
                                </h1>
                                <h4 className='lead text-center'>
                                    Write your new password
                                </h4>
                                <form onSubmit={this.onSubmit}>
                                    <TextInputGroup
                                        type='password'
                                        name='password'
                                        placeholder='New Password'
                                        value={this.state.password}
                                        error={errors.password}
                                        onChange={this.onChange}
                                    />
                                    <input
                                        className='btn btn-register mt-4 btn-block btn-primary'
                                        type='submit'
                                        value='Update'
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { resetPassword }
)(withRouter(ResetPassword));
