const express = require('express');
const router = express.Router();
const Movie = require('../../models/Movie');

// @route   GET api/movies
// @desc    Get all movies
// @acces   Public
router.get('/', (req, res) => {
  Movie.find()
    .sort({ date: -1 })
    .then((movies) => {
      res.json(movies);
    });
});

// @route   POST api/movies
// @desc    post new movies
// TODO     @acces Private
router.post('/', (req, res) => {
  res.json(req.body);
  const newMovie = new Movie(req.body);
  newMovie
    .save()
    .then((movie) => res.json(movie))
    .catch((err) => res.json({ message: err }));
});

// @route   DELETE api/movies
// @desc    delete movies
// TODO     @acces Private
router.delete('/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => movie.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
