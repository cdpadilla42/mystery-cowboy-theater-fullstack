const express = require('express');
const router = express.Router();
const Movie = require('../../models/Movie');
const Theater = require('../../models/Theater');

// @route   GET api/movies/:theater
// @desc    Get all movies at given theater
// @acces   Public
// TODO Debug - the theater find method is not returning any theaters at all
// TODO Try this - try creating theaters on this side of things, posting, and then trying to get the theaters. It connects, but isn't accessing a collection
router.get('/:theater', async (req, res) => {
  const theater = await Theater.find({});
  res.json({ theater: theater._id });

  const movies = await Movie.find({ theater: theater._id }).sort({ date: -1 });
  res.json(movies);
});

// TODO refactor for theater
// @route   POST api/movies
// @desc    post new movies
// TODO     @acces Private
router.post('/:theater', async (req, res) => {
  // res.json({ name: req.params.theater });
  const theater = await Theater.find({ name: req.params.theater });
  res.json({ theater });
  const newMovie = await new Movie({
    ...req.body,
    theater: theater._id,
  })
    .save()
    .catch((err) => res.json({ message: err }));
  res.json(newMovie);
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
