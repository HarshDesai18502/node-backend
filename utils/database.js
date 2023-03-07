const Sequelize = require('sequelize');

const sequelize = new Sequelize('Test2', 'root', 'Simform@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
