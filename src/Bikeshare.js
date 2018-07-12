import React, { Component } from 'react';
import logo from './logo.svg';
import axios from "axios";
import './Bikeshare.css';
import './css/materialize.css'
import './css/materialize.min.css'

class Bikeshare extends Component {
    state = {
      stationData: []
    }

  refresh = () => {
    // get all station data
    axios.get("https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status").then(res => {
      const data = res.data;
      console.log(data.data.stations);
      if (data.data.stations) {
        this.setState({ stationData: data.data.stations });
      }
    });
  };

  componentDidMount() {
    this.refresh();
  }


  render() {
      return (
        <div>
          <nav>
            <div class="nav-wrapper green darken-2">
              <a href="#!" class="brand-logo left"><b>BikeShare</b></a>
              <ul class="right">
                <li><a href="page.html">Station Stats</a></li>
                <li><a href="page.html">About</a></li>
                <li><a href="page.html">Contact</a></li>
              </ul>
            </div>
          </nav>
          <div class="container">
            <div class="section">
              <div class="row">
                <div class="input-field col s12 m12">
                  <input id="station" type="text" onkeydown="if (event.keyCode == 13) document.getElementById('checkButton').click()" />
                  <label for="station">Station Location</label>
                </div>
              </div>
            </div>
            <div class="section center-align">
              <a id="checkButton" class='button btn-large col s6 light-blue darken-2' href='#' >Get Status</a>
              <h4>Station Name:</h4><p id='name'></p><br/>
              <h4>Station Bikes:</h4><p id='bikes'></p><br/>
              <h4>Station Docks:</h4><p id='docks'></p><br/>
            </div>
          </div>
      </div>

    );
  }
}

export default Bikeshare;
