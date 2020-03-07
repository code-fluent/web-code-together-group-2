import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [1, 2, 3, 4, 5, 6],
      hours: [
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00"
      ],
      reservations: [{ id: 1, line: 3, day: "2020-03-07", time: "11:00:00" }]
    };
  }

  loadReservations = () => {
    axios.get("http://localhost:8080/reservations").then(response => {
      this.setState({
        reservations: response.data
      });
    });
  };

  createReservation = (line, day, hour) => {
    return axios.post("http://localhost:8080/reservations", {
      line: line,
      day: day,
      hour: hour
    });
  };

  componentDidMount() {
    this.loadReservations();
  }

  isReservedHour = (line, hour) => {
    return this.state.reservations.find(
      reservation =>
        reservation.time.includes(hour) && line === reservation.line
    );
  };

  onButtonClick = async (line, hour) => {
    await this.createReservation(line, moment().format("YYYY-MM-DD", hour));
    this.loadReservations();
  };

  render() {
    return (
      <div>
        {this.state.lines.map(line => (
          <div>
            {this.state.hours.map(hour => (
              <button
                className={this.isReservedHour(line, hour) ? "isReserved" : ""}
                onClick={() => this.onButtonClick(line, hour)}
                key={hour}
              >
                {hour}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
