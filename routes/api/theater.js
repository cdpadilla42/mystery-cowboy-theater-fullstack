const express = require('express');
const router = express.Router();
const Movie = require('../../models/Movie');
const Theater = require('../../models/Theater');

// @route   GET api/movies
// @desc    Get all movies
// @acces   Public
router.get('/:theater', async (req, res) => {
  res.json({ yes: true });
  const theater = await Theater.find({ name: req.params.theater });
  const movies = await Movie.find({ theater }).sort({ date: -1 });
  res.json(movies);
});

// @route   POST api/movies
// @desc    post new movies
// TODO     @acces Private
router.post('/:theater', (req, res) => {
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
router.delete('/:theater/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => movie.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
