const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
  res.json({ success: true });
});

router.post('/sign-up', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  }).save((err) => {
    if (err) return next(err);
    res.json({ created: true });
  });
});

// LOGIN POST
router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Error - User not found or login credentials failed',
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
