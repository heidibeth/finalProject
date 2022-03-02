const db = require('../db');

const UserModel = require('./user');
const MoodModel = require('./moodlog');
const ToDoModel = require('./toDo');
const EventModel = require('./event');


UserModel.hasMany(MoodModel);
UserModel.hasMany(ToDoModel);

UserModel.hasMany(EventModel);
EventModel.belongsTo(UserModel);
EventModel.hasMany(ToDoModel);
ToDoModel.belongsTo(EventModel);

MoodModel.belongsTo(UserModel);
ToDoModel.belongsTo(UserModel);


module.exports = {
  dbConnection: db,
  models: {
    UserModel,
    MoodModel,
    ToDoModel,
    EventModel
    }
};
