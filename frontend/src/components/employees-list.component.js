import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import FeedbackDataService from "../services/feedback.service";
import { Link } from "react-router-dom";

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveEmployees() {
    EmployeeDataService.getAll()
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmployees();
    this.setState({
      currentEmployee: null,
      currentIndex: -1
    });
  }

  setActiveEmployee(employee, index) {
    FeedbackDataService.getFeedback(employee.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          currentEmployee: employee,
          currentEmployeeFeedback: response.data,
          currentIndex: index
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          currentEmployee: null,
          currentIndex: -1
        });
      });
  }

  deleteEmployee(employeeId) {
    const confirmDelete = window.confirm('Delete employee forever?');
    if (confirmDelete) {
      EmployeeDataService.delete(employeeId)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  searchName() {
    EmployeeDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  createFeedbackList(feedbacks) {
    return feedbacks.map((feedback, idx) =>
      <li key={idx} className="list-group-item">
        <div className="text-dark">
          {feedback.remarks}
        </div>
        <div className="text-dark font-italic">
          <small>
            <label className="text-muted">Reviewed by: </label>{" "}
            {feedback.employeeName}
          </small>
        </div>
      </li>);
  }

  render() {
    const { searchName, employees, currentEmployee, currentIndex, currentEmployeeFeedback } = this.state;

    return (
      <div className="list row">
        {true &&
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={this.onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchName}
                >
                  Search
              </button>
              </div>
            </div>
          </div>
        }
        <div className="col-md-9">
          <h4>Employees List</h4>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Name</th>
                <th>Position</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees.map((employee, index) => (
                  <tr role="button"
                    className={(index === currentIndex ? "table-info table-selected" : "")}
                    onClick={() => this.setActiveEmployee(employee, index)}
                    key={index}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>
                      <Link
                        to={"/employee/edit/" + employee.id}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="badge badge-danger mr-2"
                        onClick={() => this.deleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          {currentEmployee ? (
            <div>
              <h4>Performance Reviews</h4>
              {currentEmployeeFeedback && !currentEmployeeFeedback.length &&
                <div>
                  {currentEmployee.reviewed ? "Reviewed" : "No reviews"}
                </div>
              }
              <ul className="list-group">
                {currentEmployeeFeedback && !!currentEmployeeFeedback.length &&
                  this.createFeedbackList(currentEmployeeFeedback)
                }
              </ul>

            </div>

          ) : (
            <div>
              <br />
              <p>Please click on a Employee to view performance review</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}