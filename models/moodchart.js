const { DataTypes } = require('sequelize');
const db = require('../db');

const MoodChart = db.define('chart', {
  mood: {
      type: DataTypes.STRING,
  },
  date: {
      type: DataTypes.DATEONLY,
  }
});

module.exports = MoodChart;