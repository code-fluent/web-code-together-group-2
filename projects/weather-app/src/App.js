import React, { Component } from "react";
import axios from "axios";
import City from "./City";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        { id: 1, name: "Cluj-Napoca" },
        { id: 2, name: "Brasov" }
      ],
      text: ""
    };
  }

  loadCities = () => {
    axios.get("http://localhost:8080/cities").then(response => {
      this.setState({
        cities: response.data
      });
    });
  };

  createCity = name => {
    return axios.post("http://localhost:8080/cities", {
      name: name
    });
  };

  componentDidMount() {
    this.loadCities();
  }

  onKeyPress = async event => {
    if (event.key === "Enter") {
      const name = event.currentTarget.value;
      event.currentTarget.value = "";

      await this.createCity(name);
      this.loadCities();
    }
  };

  onInputChange = event => {
    const text = event.currentTarget.value;
    this.setState({
      text: text
    });
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          className="addCity"
          placeholder="Add city"
          value={this.state.text}
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPress}
        />

        {this.state.cities.map(city => {
          return (
            <label className="city" key={city.id}>
              <City name={city.name} />
            </label>
          );
        })}
      </div>
    );
  }
}

export default App;
