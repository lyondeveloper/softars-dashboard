import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/profiles/create">
          {" "}
          <h1> Add Profile </h1>{" "}
        </Link>

        <Link to="/projects">
          {" "}
          <h1> Projects </h1>{" "}
        </Link>
      </div>
    );
  }
}

export default Dashboard;
