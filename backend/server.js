const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

const db = require("./app/models");
// TODO: For use in prodcution --> db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    //initialize 
    db.employees.create({ name: "Nick", position: "Team lead" }).then(nick => {
        let janeId = null;
        db.employees.create({ name: "Jane", position: "Senior Software Engineer" }).then(jane => {
            db.feedbacks.create({ employeeId: jane.id, remarks: 'Dedicated', reviewedBy: nick.id, reviewed: true });
            db.feedbacks.create({ employeeId: nick.id, remarks: 'Leadership, Respectful to Others', reviewedBy: jane.id, reviewed: true });
            console.log("Jane's auto-generated ID:", nick.id);
            janeId = jane.id;
        });
        db.employees.create({ name: "Mike", position: "Software Engineer" }).then(mike => {
            db.feedbacks.create({ employeeId: mike.id, remarks: 'Good Performer', reviewedBy: nick.id, reviewed: true });
            db.feedbacks.create({ employeeId: mike.id, remarks: 'Team Player', reviewedBy: janeId, reviewed: true });
            console.log("Jane's auto-generated ID:", mike.id);
        });
    });
    console.log("Test data added to tables");
});

// cors options
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());

// get route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Employee Review Management application." });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./app/routes/employee.routes")(app);
require("./app/routes/feedback.routes")(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});