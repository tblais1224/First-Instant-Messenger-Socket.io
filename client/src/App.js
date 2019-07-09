import React, { Component } from "react";
import { Container, Row } from "reactstrap";

//components
import Header from "./components/Header";
import LiveVisitors from "./components/LiveVisitors";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />

        <Container>
          <Row>
            <LiveVisitors/>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
