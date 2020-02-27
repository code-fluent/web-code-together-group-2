import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      text: "",
      filter: "ALL"
    };
  }

  loadTodos = () => {
    axios.get("http://localhost:8080/todos").then(response => {
      this.setState({
        todos: response.data
      });
    });
  };

  createTodo = name => {
    return axios.post("http://localhost:8080/todos/", {
      name: name,
      isCompleted: 0
    });
  };

  updateTodo = (id, isCompleted) => {
    return axios.put(`http://localhost:8080/todos/${id}`, {
      isCompleted: isCompleted
    });
  };

  setFilter = filter => {
    this.setState({
      filter: filter
    });
  };

  componentDidMount() {
    this.loadTodos();
  }

  onKeyPress = async event => {
    if (event.key === "Enter") {
      const name = event.currentTarget.value;
      event.currentTarget.value = "";

      await this.createTodo(name);
      this.loadTodos();
    }
  };

  onInputChange = event => {
    const text = event.currentTarget.value;
    this.setState({
      text: text
    });
  };

  onCheckboxChange = async (id, event) => {
    const isCompleted = event.currentTarget.checked;
    await this.updateTodo(id, isCompleted);
    this.loadTodos();
  };

  filterTodos = () => {
    if (this.state.filter === "ALL") {
      return this.state.todos;
    }

    if (this.state.filter === "COMPLETED") {
      return this.state.todos.filter(todo => {
        return todo.isCompleted === 1;
      });
    }

    if (this.state.filter === "INCOMPLETED") {
      return this.state.todos.filter(todo => {
        return todo.isCompleted === 0;
      });
    }
  };

  render() {
    const filteredTodos = this.filterTodos();

    return (
      <div className="container">
        <input
          type="text"
          className="addTodo"
          placeholder="Add todo"
          value={this.state.text}
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPress}
        />

        {filteredTodos.map(todo => {
          return (
            <label className="todo" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={event => this.onCheckboxChange(todo.id, event)}
              />
              {todo.name}
            </label>
          );
        })}

        <h1>{this.state.filter}</h1>

        <div className="filters">
          <button className="filter" onClick={() => this.setFilter("ALL")}>
            All
          </button>

          <button
            className="filter"
            onClick={() => this.setFilter("COMPLETED")}
          >
            Completed
          </button>

          <button
            className="filter"
            onClick={() => this.setFilter("INCOMPLETED")}
          >
            Incompleted
          </button>
        </div>
      </div>
    );
  }
}

export default App;
