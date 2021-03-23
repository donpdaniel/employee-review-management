module.exports = app => {
    const feedback = require("../controllers/feedback.controller.js");

    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", feedback.create);
  
    // Retrieve all feedback
    router.get("/:id", feedback.findOne);
  
    // Retrieve all reviewed feedback
    router.get("/reviewed", feedback.findAllReviewed);
  
    // Retrieve an Employee's feedbacks
    router.get("/employee/:employeeId", feedback.findAll);
  
    // Update a Feedback with id
    router.put("/:id", feedback.update);
  
    // Delete a Feedback with id
    router.delete("/:id", feedback.delete);
  
 
    app.use('/api/feedback', router);
  };