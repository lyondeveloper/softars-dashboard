import React, { Component } from "react";
import axios from "axios";

//Creating the Context
const Context = React.createContext();

const Reducer = (state, action) => {};

export class Provider extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      dispatch: action => this.setState(state => Reducer(state, action))
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
