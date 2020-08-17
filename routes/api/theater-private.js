const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const passport = require('passport');
const Movie = require('../../models/Movie');
const Theater = require('../../models/Theater');
const { body, sanitizeBody, validationResult } = require('express-validator');

// @route   POST api/:theater
// @desc    Post new theater
// TODO     @acces   Private
router.post('/', [
  // Validate & Sanitize
  body('name', 'Name Required').trim().isLength({ min: 1 }).escape(),

  // Process
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors });
    }

    const newTheater = await new Theater(req.body)
      .save()
      .catch((err) => res.json({ success: false }));
    res.json(newTheater);
  },
]);

// @route   POST api/:theater
// @desc    post new movie
// TODO     @acces Private
router.post('/:theater', [
  // Validate
  body('name', 'Name required').trim().isLength({ min: 1 }).escape(),
  body('desc', 'Description required').trim().isLength({ min: 1 }).escape(),
  body('image', 'Image required').trim().isLength({ min: 1 }),
  body('price', 'Price required').trim().isLength({ min: 1 }).escape(),

  // process request
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors });
    }

    const theater = await Theater.findOne({ name: req.params.theater });
    const newMovie = await new Movie({ ...req.body, theater: theater._id })
      .save()
      .catch((err) => res.json({ message: err }));
    res.json(newMovie);
  },
]);

// @route   PUT api/:theater/:movie
// @desc    update movie
// TODO     @acces Private
router.put('/:theater/:movie', [
  // Validate
  body('name', 'Name required').trim().isLength({ min: 1 }).escape(),
  body('desc', 'Description required').trim().isLength({ min: 1 }).escape(),
  body('image', 'Image required').trim().isLength({ min: 1 }),
  body('price', 'Price required').trim().isLength({ min: 1 }).escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors });
    }
    const updatedMovie = {
      _id: req.params.movie,
      desc: req.body.desc,
      image: req.body.image,
      name: req.body.name,
      price: req.body.price,
    };
    const prevMovie = await Movie.findByIdAndUpdate(
      req.params.movie,
      updatedMovie,
      {
        // options - returns old object currently
        new: true,
      }
    ).catch((err) => res.json({ success: false }));
    res.json(prevMovie);
  },
]);

// @route   DELETE api/:theater/:id
// @desc    delete movie
// TODO     @acces Private
router.delete('/:theater/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => movie.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
