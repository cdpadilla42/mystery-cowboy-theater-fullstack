const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const privateRoutes = require('./theater-private');
const passport = require('passport');
const Movie = require('../../models/Movie');
const Theater = require('../../models/Theater');
const { body, sanitizeBody, validationResult } = require('express-validator');

// @route   GET api/:theater
// @desc    Get all theaters
// @acces   Public
router.get('/', async (req, res) => {
  const theater = await Theater.find({}).catch((err) =>
    res.json({ succes: false })
  );
  res.json(theater);
});

router.use('/users', userRoutes);

// @route   GET api/:theater
// @desc    Get all movies at a theater
// @acces   Public
router.get('/:theater', [
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors });
    }

    const theater = await Theater.find({ name: req.params.theater });
    const movies = await Movie.find({ theater }).sort({ date: -1 });
    res.json(movies);
  },
]);

router.use(
  '/',
  passport.authenticate('jwt', { session: false }),
  privateRoutes
);

module.exports = router;
