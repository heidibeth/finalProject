const { DataTypes } = require('sequelize');
const db = require('../db');

const Chart = db.define('chart', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: false,
}});

module.exports = Chart;
