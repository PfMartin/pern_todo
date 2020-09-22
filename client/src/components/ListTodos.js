import React, { Fragment } from 'react';

//components
import EditTodo from './EditTodo';

class ListTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  //Get Request when the component is rendered in order to store that data in the state at the very beginning
  componentDidMount = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos") //Makes a get request by default
      const jsonData = await response.json();

      this.setState({
        todos: jsonData
      })

    } catch(err) {
      console.error(err.message);
    }
  }

  deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE'
      })

      //.filter() returns an array of elements that don't fit the condition
      // As soon as this.state is midified the component is refreshed
      this.setState({
        todos: this.state.todos.filter(todo => todo.todo_id !== id)
      })
      console.log(this.state.todos)
    } catch(err) {
      console.error(err.message);
    }
  }

  render() {
    return(
      <Fragment>
        {" "}
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/*
              <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr>*/
            }
            {this.state.todos.map((item) => {
              return(
                <tr key={item.todo_id}>
                  <td>{item.description}</td>
                  <td><EditTodo /></td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteTodo(item.todo_id)}
                      >Delete
                    </button>
                  </td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
    </Fragment>
    )
  }
}

export default ListTodos;