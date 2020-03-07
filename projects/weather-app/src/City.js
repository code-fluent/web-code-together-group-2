import React, { Component } from "react";
import axios from "axios";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: undefined
    };
  }

  loadWeather = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.props.name}&units=metric&APPID=92069bf957d02bc300f09ef3edd27e75`
      )
      .then(response => {
        this.setState({
          weather: response.data
        });
      });
  };

  componentDidMount() {
    this.loadWeather();
  }

  render() {
    if (!this.state.weather) return null;

    return (
      <div className="city">
        <h1 className="cityName">{this.props.name}</h1>
        <h3 className="cityName">Temp: {this.state.weather.main.temp}</h3>
        <h3 className="cityName">
          Pressure: {this.state.weather.main.pressure}
        </h3>
      </div>
    );
  }
}

export default City;
