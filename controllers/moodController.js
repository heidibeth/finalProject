const router = require('express').Router();
const validateJWT = require('../middleware/validate-jwt');
const { models } = require('../models');

/* 
========================
    Create a Mood Log
========================
*/
router.post('/', validateJWT, async (req, res) => {
  const { date, mood, struggleWith, gratefulFor, goalForWeek, summaryOfDay } = req.body;
  const { id } = req.user;
  const moodEntry = {
    userId: id,
    date,
    mood,
    struggleWith,
    gratefulFor,
    goalForWeek,
    summaryOfDay
  };
  try {
    const newEntry = await models.MoodModel.create(moodEntry);
    res.status(200).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
});

/* 
========================
    Get all Logs
========================
*/
router.get('/all', validateJWT, async (req, res) => {
  try {
    const moodLogs = await models.MoodModel.findAll();
    res.status(200).json(moodLogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

/* 
========================
    Get logs by User
========================
*/
router.get('/mine', validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const moodLogs = await models.MoodModel.findAll({
      where: {
        userId: id,
      },
    });
    res.status(200).json(moodLogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

/* 
========================
      Update Logs
========================
*/
router.put('/:id', validateJWT, async (req, res) => {
  const { date, mood, struggleWith, gratefulFor, goalForWeek, summaryOfDay } = req.body;

  try {
    await models.MoodModel.update(
      { date, mood, struggleWith, gratefulFor, goalForWeek, summaryOfDay },
      { where: { id: req.params.id }, returning: true }
    ).then((result) => {
      res.status(200).json({
        message: 'Mood log successfully updated!',
        updatedMood: result,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update mood log ${err}`,
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
  const moodEntryId = req.params.id;

  try {
    const query = {
      where: {
        id: moodEntryId,
        userId: userId,
      },
    };

    const deleteMood = await models.MoodModel.destroy(query);

    if (deleteMood) {
      req.user.id = deleteMood;
      res.status(200).json({
        message: 'Mood Log Entry Removed',
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
