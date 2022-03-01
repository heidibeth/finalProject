const router = require('express').Router();
const validateJWT = require('../middleware/validate-jwt');
const { models } = require('../models');

/* 
========================
 Create a To Do List
========================
*/

router.post('/', validateJWT, async (req, res) => {
    const { event, isComplete } = req.body;
  const { id } = req.user;
  const toDoEntry = {
      userId: id,
      event,
      isComplete
};
    try {
        const newToDoList = await models.ToDoModel.create(toDoEntry);
        res.status(200).json(newToDoList);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/* 
========================
    Get all Lists
========================
*/

router.get('/all', validateJWT, async (req, res) => {
    try {
        const toDoLists = await models.ToDoModel.findAll();
        res.status(200).json(toDoLists);
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
    const { event, isComplete } = req.body;

    try {
        await models.ToDoModel.update(
           { event, isComplete },
           { where: { id: req.params.id }, returning: true }
        ).then((result) => {
            res.status(200).json({
                message: 'List successfully updated!',
                updatedList: result,
              });
            });
          } catch (err) {
            res.status(500).json({
              message: `Failed to update list ${err}`,
        });
    }
});

/* 
========================
      Delete Logs
========================
*/

router.delete('/:id', validateJWT, async (req, res) => {
    const userId = req.user.id;
    const toDoEntryId = req.params.id;
  
    try {
      const query = {
        where: {
          id: toDoEntryId,
          userId: userId,
        },
      };
  
      const deleteToDo = await models.ToDoModel.destroy(query);
  
      if (deleteToDo) {
        req.user.id = deleteToDo;
        res.status(200).json({
          message: 'To Do Entry Removed',
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