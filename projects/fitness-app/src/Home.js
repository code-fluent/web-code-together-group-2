import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      level: ""
    };
  }

  signUp = async () => {
    await axios.post("http://localhost:8080/users", {
      name: this.state.name,
      level: this.state.level
    });

    this.props.history.push(`/${this.state.level}`);
  };

  onNameChange = event => {
    const name = event.currentTarget.value;
    this.setState({
      name: name
    });
  };

  onLevelChange = event => {
    const level = event.currentTarget.value;
    this.setState({
      level: level
    });
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={this.state.name}
          onChange={this.onNameChange}
        />

        <select className="input" value={this.state.level}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <button className="button" onClick={this.signUp}>
          Sign Up
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
