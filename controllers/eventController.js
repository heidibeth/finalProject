const router = require('express').Router();
const validateJWT = require('../middleware/validate-jwt');
const { models } = require('../models');
const ToDo = require('../models/toDo');

/* 
========================
 Create Event
========================
*/

router.post('/', validateJWT, async (req, res) => {
    const { event, isComplete } = req.body;
  const { id } = req.user;
  const eventEntry = {
      userId: id,
      event
};
    try {
        const newEvent = await models.EventModel.create(eventEntry);
        res.status(200).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/* 
========================
    Get All Events
========================
*/

router.get('/all', validateJWT, async (req, res) => {
    try {
        const events = await models.EventModel.findAll({include:[{model: models.ToDoModel}]
        });
        res.status(200).json(events);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

/* 
========================
    Update List
========================
*/

router.put('/:id', validateJWT, async (req, res) => {
    const { event } = req.body;

    try {
        await models.EventModel.update(
           { event },
           { where: { id: req.params.id }, returning: true }
        ).then((result) => {
            res.status(200).json({
                message: 'Event successfully updated!',
                updatedEvent: result,
              });
            });
          } catch (err) {
            res.status(500).json({
              message: `Failed to update event ${err}`,
        });
    }
});

/* 
========================
      Delete Event
========================
*/

router.delete('/:id', validateJWT, async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;
  
    try {
      const query = {
        where: {
          id: eventId,
          userId: userId,
        },
      };
  
      const deleteEvent = await models.EventModel.destroy(query);
  
      if (deleteEvent) {
        req.user.id = deleteEvent;
        res.status(200).json({
          message: 'Event Removed',
        });
      } else {
        res.status(403).json({
          message: 'Forbidden',
        });
      }
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  });
  
module.exports = router;