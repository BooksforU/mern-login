import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Axios from "axios";
import {Link} from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";

export default class Create extends Component {
  constructor(props) {
    super(props);
    // error generate TypeError: Cannot read property 'setState' of undefined we can use bind
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  //   find all user
  componentDidMount() {
    try {
      Axios.get("http://localhost:5000/api/users/users").then(res => {
        this.setState({
          users: res.data.map(user => user.name),
          username: res.data[0].name
        });
      });
      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }
  // onchange
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const ex = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    try {
      Axios.post("http://localhost:5000/api/exercise/", ex).then(res => {
        console.log(res.data);
      });
    } catch (error) {}
    this.setState({});
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
          <div className="form-group">
            <Link to="/view">
              <input
                type="submit"
                value="View Exercise Log"
                className="btn btn-primary"
              />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
