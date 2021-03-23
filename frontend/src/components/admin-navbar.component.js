import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

export default class AdminNavbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Review Management
           </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Employees List
        </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Employee
        </Link>
            </li>
          </div>
        </nav>
      </div>);
  }
}
