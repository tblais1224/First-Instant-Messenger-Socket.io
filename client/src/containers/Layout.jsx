import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import { Route, Switch } from "react-router-dom";

//components
import Header from "../components/Header";

import routes from "../routes";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        
          
            <Switch>
              {/* map through routes file */}
              {routes.map((route, index) => {
                return route.Component ? (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={props => <route.Component {...props}></route.Component>}
                  />
                ) : null;
              })}
            </Switch>
          
        
      </React.Fragment>
    );
  }
}

export default Layout;
