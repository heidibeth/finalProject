const { DataTypes } = require('sequelize');
const db = require('../db');

const ToDo = db.define('todo', {
  toDo: {
      type: DataTypes.STRING,
  },
  isComplete: {
      type: DataTypes.BOOLEAN,
  }
});

module.exports = ToDo;