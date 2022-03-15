const router = require('express').Router();
const { models } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* 
========================
    Create User
========================
*/
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  try {
    const User = await models.UserModel.create({
      firstName,
      lastName,
      email,
      username,
      password: bcrypt.hashSync(password, 10),
      isAdmin: false
    });

    const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 12,
    });

    res.status(201).json({
      message: 'User successfully created',
      user: User,
      sessionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: 'Email already in use',
      });
    } else {
      res.status(500).json({
        message: `Unable to create user: ${err}`,
      });
    }
  }
});

/* 
========================
    Login a User
========================
*/
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginUser = await models.UserModel.findOne({
      where: {
        username: username,
      },
    });
    if (loginUser) {
      const passwordCompare = await bcrypt.compare(password, loginUser.password);

      if (passwordCompare) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        res.status(200).json({
          message: 'User successfully logged in!',
          user: loginUser,
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: 'Incorrect username or password',
        });
      }
    } else {
      res.status(401).json({
        message: 'Incorrect username or password',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Failed to log user in. Error: ${err}`,
    });
  }
});

module.exports = router;
