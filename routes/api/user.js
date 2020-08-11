const express = require('express');
const router = express.Router();
const User = require('../../models/User');

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

module.exports = router;
