const db = require('../db');

const UserModel = require('./user');
const MoodModel = require('./moodlog');
const ToDoModel = require('./toDo');
const MoodChart = require('./moodchart');

UserModel.hasMany(MoodModel);
UserModel.hasMany(ToDoModel);
UserModel.hasMany(MoodChart);

MoodModel.hasMany(MoodChart);
MoodChart.belongsTo(MoodModel);

MoodModel.belongsTo(UserModel);
ToDoModel.belongsTo(UserModel);
MoodChart.belongsTo(UserModel);


module.exports = {
  dbConnection: db,
  models: {
    UserModel,
    MoodModel,
    ToDoModel,
    MoodChart
    }
};
