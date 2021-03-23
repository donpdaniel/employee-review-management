module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
      remarks: {
        type: Sequelize.STRING
      },
      reviewedBy: {
        type: Sequelize.STRING
      },
      reviewed: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Feedback;
  };