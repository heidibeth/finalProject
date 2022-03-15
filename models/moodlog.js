const { DataTypes } = require('sequelize');
const db = require('../db');

const MoodLog = db.define('moodlog', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  struggleWith: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gratefulFor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goalForWeek: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summaryOfDay: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  }
});

module.exports = MoodLog;
