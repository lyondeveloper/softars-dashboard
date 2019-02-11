import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from './Footer';
import { connect } from 'react-redux';

import '../../css/Landing.css';

class Landing extends Component {
    render() {
        const { isAuthenticated } = this.props.auth;

        let landingContent;

        if (!isAuthenticated) {
            landingContent = (
                <div className='landing'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='landing-body'>
                                    <div className='jumbotron landing-jumbotron'>
                                        <h1 className='display-3 mb-4'>
                                            SoftArs Dashboard
                                        </h1>
                                        <p className='lead mb-5'>
                                            ¡Welcome to our dashboard! Here you
                                            can see our lastest projects
                                            finished, the company's team
                                            information and more, sign in now if
                                            you have an account, sign up if you
                                            don't.
                                        </p>
                                        <Link
                                            to='/register'
                                            className='btn btn-success mr-3'
                                        >
                                            Press Here To Sign Up
                                        </Link>
                                        <Link
                                            to='/login'
                                            className='btn btn-primary mr-3'
                                        >
                                            Press Here To Log in
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            landingContent = <Redirect to='/dashboard' />;
        }

        return landingContent;
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
