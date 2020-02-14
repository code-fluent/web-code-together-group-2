import React, { Component } from "react";
import ReactDOM from "react-dom";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    console.log("Component did mount.");
    this.timer = setInterval(() => {
      this.setState({
        time: new Date()
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <h1>{this.state.time.toISOString()}</h1>;
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
