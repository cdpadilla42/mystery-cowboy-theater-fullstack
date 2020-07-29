import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TheaterPicker from './TheaterPicker';
import App from './App';
import Order from './Order';
import NotFound from './NotFound';
import UpdateMovies from './UpdateMovies';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TheaterPicker} />
        <Route exact path="/theater/:theaterId" component={App} />
        <Route
          exact
          path="/theater/:theaterId/update-movies"
          component={UpdateMovies}
        />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
