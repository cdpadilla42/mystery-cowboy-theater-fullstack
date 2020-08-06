import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditMovieForm extends Component {
  static propTypes = {
    updateMovie: PropTypes.func,
    movie: PropTypes.object,
    index: PropTypes.string,
    saveMovieUpdateToDB: PropTypes.func,
  };

  handleChange = (e) => {
    // 1. take in value and store into movies
    const input = e.target;
    const movie = {
      ...this.props.movie,
      [input.name]: input.value,
    };
    // 2. send value to state for change w/ passed down prop.
    this.props.updateMovie(movie, this.props.index);
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const movie = this.props.movie;

    return (
      <div className="edit_movie_form">
        <figure className="edit_movie_form__image_preview">
          <img src={movie.image} alt="" />
        </figure>
        <section className="edit_movie_form__form">
          <form action="#">
            <div className="edit_movie_form__first_row_flex_wrap">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="resize-ta"
                value={movie.name}
                onChange={this.handleChange}
              ></input>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price"
                value={movie.price}
                onChange={this.handleChange}
              />
            </div>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="Image"
              value={movie.image}
              onChange={this.handleChange}
            />
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              onChange={this.handleChange}
            >
              {movie.desc}
            </textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                this.props.deleteMovie(this.props.index);
              }}
            >
              Delete Movie
            </button>
            <button
              id="save_btn"
              onClick={(e) => {
                e.preventDefault();
                this.props.saveMovieUpdateToDB(this.props.index);
              }}
            >
              Save Changes
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default EditMovieForm;
