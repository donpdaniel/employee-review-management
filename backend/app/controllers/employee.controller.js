const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Employee
  const employee = {
    name: req.body.name,
    position: req.body.position,
    reviewed: req.body.reviewed ? req.body.reviewed : false
  };

  // Save Employee in the database
  Employee.create(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Employee.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      });
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Employee with id=" + id
        });
      });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Employee.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Employee with id=" + id
        });
      });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was deleted successfully!"
          });
        } else {
          res.send({
            message: `Error: Cannot delete Employee with id=${id}. Maybe Employee was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Employee with id=" + id
        });
      });
};

// Find all reviewed Employees
exports.findAllReviewed = (req, res) => {
    Employee.findAll({ where: { reviewed: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};