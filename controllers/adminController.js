const router = require('express').Router();
const validateJWT = require('../middleware/validate-jwt');
const { models } = require('../models');

/* 
========================
    Get all Users
========================
*/
router.get('/all-users', validateJWT, async (req, res) => {
  try {
      if (req.user.isAdmin === false) {
        res.status(501).json("Error...You aren't priviliedge to access the data")
      } else {
        const users = await models.UserModel.findAll({});
        res.status(201).json({ users });
      }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

/* 
========================
    Get all Todos
========================
*/

router.get('/all-todos', validateJWT, async (req, res) => {
    try {
        if (req.user.isAdmin === false) {
            res.status(501).json("Error: You do not have access to this data")
        } else {
            const todos = await models.ToDoModel.findAll({})
            res.status(201).json(todos)
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});


router.get('/all-moods', validateJWT, async (req, res) => {
    try {
        if (req.user.isAdmin === false) {
            res.status(501).json("Error: You do not have access to this data")
        } else {
            const todos = await models.MoodModel.findAll({})
            res.status(201).json(todos)
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

router.get('/all-charts', validateJWT, async (req, res) => {
    try {
        if (req.user.isAdmin === false) {
            res.status(501).json("Error: You do not have access to this data")
        } else {
            const todos = await models.ToDoModel.findAll({})
            res.status(201).json(todos)
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;
