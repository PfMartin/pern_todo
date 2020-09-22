import React, { Fragment } from 'react';

class InputTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    }

    this.setDescription = this.setDescription.bind(this); //Bind the function to the class
  }

  //Function that sets the state from the user input
  //Take the value of the target where the event has been fired
  setDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  //Function that stores the data in the database
  //Use the post route from the express server on localhost:5000/todos to store the state in the database todo
  onSubmitForm = async(e) => {
    e.preventDefault(); //Prevent redirection
    try {
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST", //Post method for sending data to the database
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state) //Convert object into JSON-String
      });

      window.location = "/"; //Refresh the page
      console.log(response)
    } catch(err) {
      console.error(err.message);
    }
  }

  render() {
    return(
      <Fragment>
        <h1 className="text-center mt-5">Pern Todo List</h1>
        <form className="d-flex mt-5" onSubmit={this.onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={this.state.description}
          onChange={this.setDescription}
        />
        <button className="btn btn-success">Add</button>
        </form>
      </Fragment>
    )
  }
}

export default InputTodo;