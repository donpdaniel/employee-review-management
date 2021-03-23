import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      name: "",
      position: "", 
      reviewed: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }

  saveEmployee() {
    var data = {
      name: this.state.name,
      position: this.state.position
    };

    EmployeeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          position: response.data.position,
          reviewed: response.data.reviewed,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      name: "",
      position: "",
      reviewed: false,

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Employee added successfully!</h4>
              <button className="btn btn-success" onClick={this.newEmployee}>
                Add another employee
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="position">Profession</label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  required
                  value={this.state.position}
                  onChange={this.onChangePosition}
                  name="position"
                />
              </div>
  
              <button onClick={this.saveEmployee} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}