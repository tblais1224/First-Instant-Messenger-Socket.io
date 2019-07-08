import React, { Component } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:5000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const {response} = this.state
    return (
      <div style={{textAlign: "center"}}>
        {/* if response exists display temp else display loading */}
        {response ? <p>The temperature in Providence is: {response}°F</p> : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
