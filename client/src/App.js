import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//Components
import Navbar from "./components/layout/Navbar";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Landing from "./components/layout/Landing";
import Projects from "./components/projects/Projects";
import AddProject from "./components/projects/AddProject";
import EditProject from "./components/projects/EditProject";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/" component={Projects} /> */}
              {/* <Route exact path="/project/add" component={AddProject} /> */}
              {/* <Route exact path="/project/edit/:id" component={EditProject} /> */}
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
