const { DataTypes } = require('sequelize');
const db = require('../db');

const Event = db.define('event', {
  event: {
      type: DataTypes.STRING,
  }
});

module.exports = Event;