import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';

//Components
import Navbar from './components/layout/Navbar';
import Register from './components/users/Register';
import Login from './components/users/Login';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Projects from './components/projects/Projects';
import AddProject from './components/projects/AddProject';
import EditProject from './components/projects/EditProject';
import PrivateRoute from './components/common/PrivateRoute';
import AddProfile from './components/profiles/AddProfile';
import EditProfile from './components/profiles/EditProfile';
import Profile from './components/profiles/Profile';
import Profiles from './components/profiles/Profiles';
import EmailSent from './components/layout/EmailSent';
import SendResetPasswordEmail from './components/users/ResetPassword/SendResetPasswordEmail';
import ResetPassword from './components/users/ResetPassword/ResetPassword';

//Actions and reducers
import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './components/utils/setAuthToken';

if (localStorage.jwtToken) {
    // If the token exist
    // Grabbing the local storage from the header, decoding it to have access to the expiration and setting the current user

    setAuthToken(localStorage.jwtToken);

    const decoded = jwt_decode(localStorage.jwtToken);

    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        //Loggin out user and redirecting to login form

        store.dispatch(logoutUser());

        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className='App'>
                        <Navbar />
                        <Route exact path='/' component={Landing} />
                        <div className='container'>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/email-sent'
                                component={EmailSent}
                            />
                            <Route
                                exact
                                path='/send-email'
                                component={SendResetPasswordEmail}
                            />
                            <Route
                                exact
                                path='/reset-password/:token/:email'
                                component={ResetPassword}
                            />
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/dashboard'
                                    component={Dashboard}
                                />
                                <PrivateRoute
                                    exact
                                    path='/profiles/create'
                                    component={AddProfile}
                                />
                                <PrivateRoute
                                    exact
                                    path='/profile/edit/:handle'
                                    component={EditProfile}
                                />
                                <PrivateRoute
                                    exact
                                    path='/profiles'
                                    component={Profiles}
                                />
                                <PrivateRoute
                                    exact
                                    path='/profile/:handle'
                                    component={Profile}
                                />
                                <PrivateRoute
                                    exact
                                    path='/projects'
                                    component={Projects}
                                />
                                <PrivateRoute
                                    exact
                                    path='/projects/add'
                                    component={AddProject}
                                />
                                <PrivateRoute
                                    exact
                                    path='/projects/edit/:id'
                                    component={EditProject}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
