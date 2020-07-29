import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { priceConverter, formatTime } from '../helper';

class Movie extends Component {
  static propTypes = {
    movie: PropTypes.object,
    addToOrder: PropTypes.func,
    index: PropTypes.string,
  };

  handleShowtimeClick = (e) => {
    console.log(e.target, this.props.index);
  };

  renderShowTimes = () => {
    const movie = this.props.movie;
    const showtimes = movie.showtimes;
    if (!showtimes) {
      return <div>No Showtimes yet!</div>;
    }
    return Object.keys(showtimes).map((key) => {
      return (
        <button key={key} index={key} onClick={this.handleShowtimeClick}>
          {showtimes[key].time}
        </button>
      );
    });
  };

  render() {
    const movie = this.props.movie;
    return (
      <div className="movie_card">
        <img
          className="card-img-top movie__poster"
          src={movie.image}
          alt={movie.name}
        ></img>
        <div className="card-body">
          <h5 className="card-title">{movie.name}</h5>
          <p className="card-text">{movie.desc}</p>
          <p className="price">{priceConverter(movie.price)}</p>
          <p>{formatTime(movie.showtime)}</p>
          {/* Future Feature: Select show times */}
          {/* <div className="showTimes">
            <h3>Showtimes:</h3>
            {this.renderShowTimes()}
          </div> */}
          <p>
            <button
              className="btn btn-primary"
              onClick={() => this.props.addToOrder(this.props.index)}
            >
              Add To Order
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Movie;
