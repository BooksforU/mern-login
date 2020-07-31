import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "antd";

// child component
const Exercise = props => {
  console.log(props.exercise);
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.salary}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

const Add = () => (
  <div>
    <Link to="/create">
      <Button type="primary " className="w-100 mt-5 ml-5">
        Add New
      </Button>
    </Link>
  </div>
);

export default class Read extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: null };
  }
  // get exercises
  componentDidMount() {
    try {
      Axios.get("http://localhost:5000/api/exercise/").then(response => {
        console.log(response.data);
        response.data.map(r => {
          console.log(r.module);
          this.setState({ exercises: r.module });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  
 

  // Delete
  deleteExercise(id) {
    Axios.delete(`http://localhost:5000/api/exercise/${id}`).then(res => {
      console.log(res.data);
    });
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  // Showing list
  // exerciseList() {
  //   if (this.state.exercises.length === 0) {
  //     return <Add />;
  //   }
  //   return this.state.exercises.map(currentexercise => {
  //     return (
  //       <Exercise
  //         exercise={currentexercise}
  //         deleteExercise={this.deleteExercise}
  //         key={currentexercise._id}
  //       />
  //     ); //child component
  //   });

  // }
  

  randomList() {
    return (
      this.state.exercises &&
      this.state.exercises.map(currentexercise => {
        console.log(currentexercise);
        return (
          <Exercise
            exercise={currentexercise}
            deleteExercise={this.deleteExercise}
            key={currentexercise._id}
          />
        ); //child component
      })
    );
  }

  render() {
    this.handleData = ()=>{
      try {
        Axios.post("http://localhost:5000/api/exercise/").then(res => {
          console.log(res.data);
          window.location.reload()
        });
      } catch (error) {}
      this.setState({});
    }
    
   
    
    return (
      <div>
        <h3>Logged Exercises</h3>
        
          <Button type="primary" className="" onClick={this.handleData}>
            Generate 100 logs
          </Button>
        <table className="table mt-3">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Salary(in All currency)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.randomList()}</tbody>
        </table>
      </div>
    );
  }
}
