const express = require('express');
const router = express.Router();
const Movie = require('../../models/Movie');

// @route   GET api/movies
// @desc    Get all movies
// @acces   Public
router.get((req, res) => {
  Movie.find()
    .sort({ date: -1 })
    .then((movies) => {
      res.json(movies);
    });
});

// @route   POST api/movies
// @desc    post new movies
// TODO     @acces Private
router.post((req, res) => {
  const newMovie = new Movie({
    ...req.body,
  });
  newMovie.save().then((move) => res.json(movie));
});

// @route   DELETE api/movies
// @desc    delete movies
// TODO     @acces Private
router.delete((req, res) => {
  // TODO write delete route
});
