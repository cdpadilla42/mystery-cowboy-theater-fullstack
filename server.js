const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const theaterRoutes = require('./routes/api/theater');
const secretRoutes = require('./routes/api/secret');
const UserModel = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());
app.use(cors());

// DB Config

const db = process.env.DB_URI;

// Connect to Mongo
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Use Passport for sessions
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    function (username, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return UserModel.findOne({ username })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: 'Incorrect email.' });
          }

          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return cb(null, user);
            } else {
              // passwords do not match!
              return cb(null, false, { msg: 'Incorrect password' });
            }
          });
        })
        .catch((err) => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      return cb(null, { success: true });
    }
  )
);

// Use routes
app.use('/api', theaterRoutes);
app.use(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  secretRoutes
);

// Serve Static Assets if in Production
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

// // Old Way
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('/static'));
//   // app.use(express.static('/var/app/current/client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// Ports

const port = process.env.PORT || 7777;
// const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server started on port ${port}`));
