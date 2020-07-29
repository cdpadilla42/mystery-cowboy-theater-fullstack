const express = require('express');
const router = express.Router();
const Movie = require('../../models/Movie');
const Theater = require('../../models/Theater');

// @route   GET api/:theater
// @desc    Get all theaters
// @acces   Public
router.get('/', async (req, res) => {
  const theater = await Theater.find({}).catch((err) =>
    res.json({ succes: false })
  );
  res.json(theater);
});

// @route   POST api/:theater
// @desc    Post new theater
// TODO     @acces   Private
router.post('/', async (req, res) => {
  const newTheater = await new Theater(req.body)
    .save()
    .catch((err) => res.json({ success: false }));
  res.json(newTheater);
});

// @route   GET api/:theater
// @desc    Get all movies at a theater
// @acces   Public
router.get('/:theater', async (req, res) => {
  // res.json({ yes: true });
  const theater = await Theater.find({ name: req.params.theater });
  const movies = await Movie.find({ theater }).sort({ date: -1 });
  res.json(movies);
});

// @route   POST api/:theater
// @desc    post new movie
// TODO     @acces Private
router.post('/:theater', async (req, res) => {
  // res.json(req.body);
  const theater = await Theater.findOne({ name: req.params.theater });
  // res.json({ theater: theater });
  // res.json({ theater: theater._id, ...req.body });
  const newMovie = await new Movie({ ...req.body, theater: theater._id })
    .save()
    .catch((err) => res.json({ message: err }));
  res.json(newMovie);
});

// @route   DELETE api/:theater/:id
// @desc    delete movie
// TODO     @acces Private
router.delete('/:theater/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => movie.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
