const { DataTypes } = require('sequelize');
const db = require('../db');

const ToDo = db.define('todo', {
  event: {
      type: DataTypes.STRING,
  },
  isComplete: {
      type: DataTypes.BOOLEAN,
  }
});

module.exports = ToDo;