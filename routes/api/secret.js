const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Protected request using JWT
router.get('/', (req, res, next) => {
  res.json({
    success: true,
    message: 'Welcome to the secret!',
  });
});

module.exports = router;
