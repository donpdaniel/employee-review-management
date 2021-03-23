import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddEmployee from "./components/add-employee.component";
import Employee from "./components/employee.component";
import EmployeesList from "./components/employees-list.component";
import Feedback from "./components/feedback.component";
import AdminNavbar from "./components/admin-navbar.component";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AdminNavbar />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/admin"]} component={EmployeesList} />
            <Route exact path="/add" component={AddEmployee} />
            <Route path="/employee/edit/:id" component={Employee} />
            <Route path="/review/:id" component={Feedback} />
          </Switch>
        </div>
        <nav className="navbar navbar-expand fixed-bottom navbar-dark bg-primary">
          <div className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to={"/admin"} className="nav-link">
                Admin View
             </Link>
            </li>
            <li className="nav-item">
              <Link to={"/review/1"} className="nav-link">
                Employee View
            </Link>
            </li>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default App;
