import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.updateReviewed = this.updateReviewed.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);

    this.state = {
      currentEmployee: {
        id: null,
        name: "",
        position: "",
        reviewed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          name: name
        }
      };
    });
  }

  onChangePosition(e) {
    const position = e.target.value;

    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        position: position
      }
    }));
  }

  getEmployee(id) {
    EmployeeDataService.get(id)
      .then(response => {
        this.setState({
          currentEmployee: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateReviewed(status) {
    var data = {
      id: this.state.currentEmployee.id,
      name: this.state.currentEmployee.name,
      position: this.state.currentEmployee.position,
      reviewed: status
    };

    EmployeeDataService.update(this.state.currentEmployee.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentEmployee: {
            ...prevState.currentEmployee,
            reviewed: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEmployee() {
    if (this.state.currentEmployee.name) {
      EmployeeDataService.update(
        this.state.currentEmployee.id,
        this.state.currentEmployee
      )
        .then(response => {
          console.log(response.data);
          this.setState({
            message: "The employee was updated successfully!"
          });
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.setState({
        message: "The employee name cannot be empty!"
      });
    }
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee ? (
          <div className="edit-form">
            <h4>Employee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentEmployee.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  value={currentEmployee.position}
                  onChange={this.onChangePosition}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentEmployee.reviewed ? "Reviewed" : "Pending"}
              </div>
            </form>

            {currentEmployee.reviewed ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateReviewed(false)}
              >
                Reset Review
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateReviewed(true)}
              >
                Review
              </button>
            )}

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEmployee}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employee1...</p>
          </div>
        )}
      </div>
    );
  }
}