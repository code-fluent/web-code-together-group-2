import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  increment = value => {
    this.setState({
      counter: this.state.counter + value
    });
  };

  decrement = value => {
    this.setState({
      counter: this.state.counter - value
    });
  };

  render() {
    return (
      <Fragment>
        <button onClick={() => this.increment(10)}>+10</button>
        <button onClick={() => this.increment(1)}>+1</button>
        <h1>{this.state.counter}</h1>
        <button onClick={() => this.decrement(1)}>-1</button>
        <button onClick={() => this.decrement(10)}>-10</button>
      </Fragment>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
