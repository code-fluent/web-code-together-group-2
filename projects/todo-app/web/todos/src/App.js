import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/todos").then(response => {
      this.setState({
        todos: response.data
      });
    });
  }

  onKeyPress = async event => {
    if (event.key === "Enter") {
      const name = event.currentTarget.value;
      event.currentTarget.value = "";

      await axios.post("http://localhost:8080/todos", {
        name: name,
        isCompleted: 0
      });

      axios.get("http://localhost:8080/todos").then(response => {
        this.setState({
          todos: response.data
        });
      });
    }
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          className="addTodo"
          placeholder="Add todo"
          onKeyPress={this.onKeyPress}
        />

        {this.state.todos.map(function(todo) {
          return (
            <label className="todo" key={todo.id}>
              <input type="checkbox" />
              {todo.name}
            </label>
          );
        })}

        <div className="filters">
          <button className="filter">All</button>
          <button className="filter">Completed</button>
          <button className="filter">Incompleted</button>
        </div>
      </div>
    );
  }
}

export default App;
