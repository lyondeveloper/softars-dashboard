import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

//Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Landing from "./components/layout/Landing";
import Projects from "./components/projects/Projects";
import AddProject from "./components/projects/AddProject";
import EditProject from "./components/projects/EditProject";
import PrivateRoute from "./components/common/PrivateRoute";

//Actions and reducers
import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./components/utils/setAuthToken";

//Styles
import "./css/Footer.css";
import "./css/Dashboard.css";
import "./css/Landing.css";
import "./css/Login.css";
import "./css/Navbar.css";
import "./css/Profile.css";
import "./css/Register.css";

if (localStorage.jwtToken) {
  // If the token exist
  // Grabbing the local storage from the header, undeconding it to have access to the expiration and setting the current user

  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //Loggin out user and redirecting to login form

    store.dispatch(logoutUser());

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Projects} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/projects/add"
                  component={AddProject}
                />
                <PrivateRoute
                  exact
                  path="/projects/edit/:id"
                  component={EditProject}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
