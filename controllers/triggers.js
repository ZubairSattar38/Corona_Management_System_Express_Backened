const db = require('../models');
module.exports = {
    doctorView: function ()  {
     db.sequelize.query('CREATE TRIGGER checkAge AFTER INSERT ON users' +
            ' FOR EACH ROW' +
            ' BEGIN' +
            ' insert into users (age) values(`${age}`);' +
            'END;')
    }
}