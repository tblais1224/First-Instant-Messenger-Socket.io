import React, { Component } from "react";
import Layout from "./containers/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Layout}></Route>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
