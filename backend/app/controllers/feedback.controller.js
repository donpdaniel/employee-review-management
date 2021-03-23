const db = require("../models");
const Feedback = db.feedbacks;
const Employee = db.employees;
const { QueryTypes } = db.Sequelize;

// Create and Save a new Feedback
exports.create = (req, res) => {
  // Validate request
  if (!req.body.remarks) {
    res.status(400).send({
      message: "Remarks can not be empty!"
    });
    return;
  }

  // Create a Feedback
  const feedback = {
    remarks: req.body.remarks,
    reviewed: req.body.reviewed ? req.body.reviewed : false,
  };

  // Save Feedback in the database
  Feedback.create(feedback)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Feedback."
      });
    });
};

// Find a all requested reviews for an employee id
exports.getRequestedReviews = (req, res) => {
  const id = req.params.id;

  Feedback.findAll({
    where: { reviewedBy: id },
    include: [
      {
        model: Employee,
      },
    ],
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving feedbacks."
    });
  });
};

// Retrieve all Feedbacks from the database.
exports.findAll = async (req, res) => {
  const employeeId = req.params.employeeId;
  db.sequelize.query(
    'SELECT feedbacks.*, emp.name AS employeeName FROM feedbacks LEFT JOIN employees AS emp ON emp.id = feedbacks.reviewedBy WHERE employeeId = $employeeId',
    {
      bind: { employeeId: employeeId },
      type: QueryTypes.SELECT
    }
  ).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feedbacks."
      });
    });
};

// Find a single Feedback with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Feedback.findByPk(id, {
    include: [
      {
        model: Employee,
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Feedback with id=" + id
      });
    });
};

// Update a Feedback by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Feedback.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Feedback was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Feedback with id=${id}. Maybe Feedback was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Feedback with id=" + id
      });
    });
};

// Delete a Feedback with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Feedback.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Feedback was deleted successfully!"
        });
      } else {
        res.send({
          message: `Error: Cannot delete Feedback with id=${id}. Maybe Feedback was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Feedback with id=" + id
      });
    });
};

// Find all reviewed Feedbacks
exports.findAllReviewed = (req, res) => {
  Feedback.findAll({ where: { reviewed: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feedbacks."
      });
    });
};