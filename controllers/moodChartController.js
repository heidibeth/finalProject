const router = require('express').Router();
const validateJWT = require('../middleware/validate-jwt');
const { models } = require('../models');

/* 
========================
   Create a Mood Chart
========================
*/
router.post('/', validateJWT, async (req, res) => {
    const { date, mood } = req.body;
    const { id } = req.user;
    const chartEntry = {
      userId: id,
      date,
      mood
    };
    try {
      const newChart = await models.MoodChart.create(chartEntry);
      res.status(200).json(newChart);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

/* 
========================
    Get Charts by User
========================
*/
router.get('/mine', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
      const moodChart = await models.MoodChart.findAll({
        where: {
          userId: id,
        },
      });
      res.status(200).json(moodChart);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });

/* 
========================
    Sort Chart by Date
========================
*/
router.get('/sort', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
      const moodChart = await models.MoodChart.findAll({ 
          where: {
            userId: id,  
            order: [['updatedAt', 'DESC']]}
        });

      res.status(200).json(moodChart);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });

module.exports = router;