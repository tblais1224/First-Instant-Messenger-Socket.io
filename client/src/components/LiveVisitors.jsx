import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import openSocket from "socket.io-client";

//connect backend socket server
const socket = openSocket("localhost:5000");

//get the user data
//connect to the server
//emit user to server
//update the table

class LiveVisitors extends Component {
  state = {
    visitors: []
  };

  componentWillMount() {
    //this url provides geolocation using ip
    axios.get("http://geoplugin.net/json.gp").then(res => {
      const {
        geoplugin_request,
        geoplugin_countryCode,
        geoplugin_city,
        geoplugin_region,
        geoplugin_countryName
      } = res.data;

      const visitor = {
        ip: geoplugin_request,
        countryCode: geoplugin_countryCode,
        city: geoplugin_city,
        state: geoplugin_region,
        country: geoplugin_countryName
      };

      //run new_visitor through backend socket
      socket.emit("new_visitor", visitor);
      //get the visitors array
      socket.on("visitors", visitors => {
        this.setState({
          visitors: visitors
        });
      });
    });
  }

  //get flag using countryflags api
  getCountryFlag = countryCode =>
    `https://www.countryflags.io/${countryCode}/flat/64.png`;

  renderTableBody = () => {
    const { visitors } = this.state;
    return visitors.map((v, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{v.ip}</td>
          <td>
            <img src={this.getCountryFlag(v.countryCode)} alt={v.countryCode} />
          </td>
          <td>{v.city}</td>
          <td>{v.state}</td>
          <td>{v.country}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Live Visitors</h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>IP</th>
              <th>Flag</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default LiveVisitors;
