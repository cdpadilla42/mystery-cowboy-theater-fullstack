const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const movieRoutes = require('./routes/api/movies');
const theaterRoutes = require('./routes/api/theater');
const secretRoutes = require('./routes/api/secret');
const UserModel = require('./models/User');

const app = express();

app.use(express.json());
app.use(cors());

// DB Config

const db = process.env.DB_URI;
// db.on('error', console.error.bind(console, 'Mongo Connection Error'));

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
      return UserModel.findOne({ username, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }
          return cb(null, user, { message: 'Logged In Successfully' });
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
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return UserModel.findOneById(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

// Initial passport logic for sessions
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// // );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/api', theaterRoutes);
app.use(
  '/api/secret',
  passport.authenticate('jwt', { session: false }),
  secretRoutes
);

// Serve Static Assets if in Production

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Ports

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
