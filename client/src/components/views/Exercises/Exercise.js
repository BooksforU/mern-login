import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default class Exercise extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12">
            Exercise Tracker Application
          </div>
          <div className="col-lg-3 col-md-3 col-xs-12 mt-5">
            <Link to="/create">
              <Button type="primary">Create Exercise</Button>
            </Link>
          </div>
          <div className="col-lg-3 col-md-3 col-xs-12 mt-5">
            <Link to="/create">
              <Button type="primary">View Exercise</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
