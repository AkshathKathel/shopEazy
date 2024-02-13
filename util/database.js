const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce_website', 'root', 'Akshath@sql088', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
