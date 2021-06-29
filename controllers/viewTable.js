const db = require('../models');
module.exports = {
  doctorView: function () {
    return db.sequelize.query(`CREATE VIEW userView AS select * from users where roll = 1`);
  },
  patientView: function () {
    return db.sequelize.query(`CREATE VIEW userView AS select * from users where roll = 2`);
  },
  down: function () {
    return db.sequelize.query(`DROP VIEW userView`);
  }
}