require('dotenv').config();

const Express = require('express');
const app = Express();

const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');

app.use(Express.json());
app.use(middleware.CORS);

app.use('/user', controllers.userController);
app.use('/moodlog', controllers.moodController);
app.use('/todo', controllers.toDoController);
app.use('/event', controllers.eventController);
app.use('/admin', controllers.adminController);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed: ${err}`);
  });

  // test