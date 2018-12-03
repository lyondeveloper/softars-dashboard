import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Projects from "./components/projects/Projects";
import AddProject from "./components/projects/AddProject";
import EditProject from "./components/projects/EditProject";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Navbar />

            <div className="container">
              <Switch>
                {/* <Route exact path="/" component={Projects} /> */}
                {/* <Route exact path="/project/add" component={AddProject} /> */}
                {/* <Route exact path="/project/edit/:id" component={EditProject} /> */}
                <Route exact path="/about" component={About} />
                {/* <Route component={NotFound} /> */}
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
