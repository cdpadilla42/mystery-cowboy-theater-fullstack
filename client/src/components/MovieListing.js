import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

class MovieListing extends Component {
  static propTypes = {
    movies: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.number,
      showtimes: PropTypes.object,
    }),
    addToOrder: PropTypes.func,
    selectMovie: PropTypes.func,
  };

  handleKey = (e) => {
    if (e.key === 'Enter') {
      const movieKey = e.currentTarget.dataset.key;
      this.props.selectMovie(movieKey);
    }
  };

  render() {
    const movies = this.props.movies;
    return (
      <section class="movies">
        <div class="movies__styled_background"></div>
        <ul class="movies__list" tabIndex="-1">
          {Object.keys(movies).map((movieKey) => {
            return (
              <li>
                <img
                  src={movies[movieKey].image}
                  key={movieKey}
                  data-key={movieKey}
                  onClick={() => this.props.selectMovie(movieKey)}
                  onKeyUp={this.handleKey}
                  alt=""
                  srcset=""
                  tabIndex="0"
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

// Below is the code that should be moved to the full movie display

{
  /* <Movie
                  movie={movies[movieKey]}
                  key={movieKey}
                  index={movieKey}
                  addToOrder={this.props.addToOrder}
                /> */
}

export default MovieListing;
