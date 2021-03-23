module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      name: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      reviewed: {
        type: Sequelize.BOOLEAN
      }
    });  
    return Employee;
  };