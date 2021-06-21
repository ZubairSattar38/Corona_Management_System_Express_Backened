const dbConfig = require('../db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    operatorsAliases: false,
});
const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

db.roll = require('./roll')(sequelize,Sequelize);
db.user = require('./user')(sequelize,Sequelize);
// db.user = require('./vaccination')(sequelize.Sequelize);
// db.doze = require('./doze')(sequelize.Sequelize);

module.exports = db;