import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddMovieForm extends Component {
  static propTypes = {
    addMovie: PropTypes.func,
    closeModalNav: PropTypes.func,
  };

  nameRef = React.createRef();
  descriptionRef = React.createRef();
  priceRef = React.createRef();
  theaterRef = React.createRef();
  imageRef = React.createRef();

  handleFormSubmit = (e) => {
    e.preventDefault();
    const movie = {
      name: this.nameRef.current.value,
      desc: this.descriptionRef.current.value,
      price: parseInt(this.priceRef.current.value),
      image: this.imageRef.current.value,
    };
    console.log(movie);
    this.props.addMovie(movie);
    this.props.closeModalNav();
  };

  render() {
    const movie = this.props.movie;

    return (
      <section className="edit_movie_form__form">
        <h2>Add a New Movie</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="edit_movie_form__first_row_flex_wrap">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="resize-ta"
              ref={this.nameRef}
              onChange={this.handleChange}
            ></input>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              ref={this.priceRef}
              onChange={this.handleChange}
            />
          </div>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Image"
            ref={this.imageRef}
            onChange={this.handleChange}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            ref={this.descriptionRef}
            onChange={this.handleChange}
          ></textarea>
          <button id="dlt_btn">Submit</button>
        </form>
      </section>
    );
  }

  // render() {
  //   return (
  //     <>
  //       <h1>Add movie</h1>
  //       <form className="add_movie" onSubmit={this.handleFormSubmit}>
  //         <input
  //           type="text"
  //           name="name"
  //           ref={this.nameRef}
  //           placeholder="name"
  //         />

  //         <input
  //           type="text"
  //           name="price"
  //           ref={this.priceRef}
  //           placeholder="price"
  //         />
  //         <input
  //           type="text"
  //           name="image"
  //           ref={this.imageRef}
  //           placeholder="image"
  //         />
  //         <textarea
  //           name="description"
  //           ref={this.descriptionRef}
  //           placeholder="description"
  //           id="desc"
  //         ></textarea>
  //         <button id="dlt_btn" type="submit">
  //           Add Movie
  //         </button>
  //       </form>
  //     </>
  //   );
  // }
}

export default AddMovieForm;
