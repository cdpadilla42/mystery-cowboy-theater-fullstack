import React, { Component } from 'react';
import '../css/theater.css';
import sampleMovies from '../sample-movies';
import EditMovieForm from './EditMovieForm';
import AddMovieForm from './AddMovieForm';
import Nav from './Nav';
import base from '../base';

class UpdateMovies extends Component {
  state = {
    movies: {},
    order: {},
    mobileNavOpen: false,
    cartModalOpen: false,
    selectedMovie: null,
    isAdminPage: true,
  };

  componentDidMount() {
    const params = this.props.match.params.theaterId;
    const orderLocalStorage = JSON.parse(localStorage.getItem(`${params}`));
    if (orderLocalStorage) {
      this.setState({
        order: orderLocalStorage,
      });
    }

    // Update Movies from firebase
    this.ref = base.syncState(`${params}/movies`, {
      context: this,
      state: 'movies',
    });

    // Add key functionality
    document.addEventListener('keyup', this.handleKeyup);
  }

  componentDidUpdate() {
    const params = this.props.match.params.theaterId;
    const order = JSON.stringify(this.state.order);
    localStorage.setItem(`${params}`, order);
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addMovie = (movie) => {
    const movieKey = `movie${Date.now()}`;
    const movies = {
      ...this.state.movies,
      [movieKey]: movie,
    };
    this.setState({
      movies,
    });
  };

  updateMovie = (movie, movieKey) => {
    const movies = {
      ...this.state.movies,
      [movieKey]: movie,
    };
    this.setState({
      movies,
    });
  };

  deleteMovie = (movieKey) => {
    const movies = {
      ...this.state.movies,
      [movieKey]: null,
    };
    this.setState({
      movies,
    });
  };

  loadSampleMovies = () => {
    const movies = { ...this.state.movies, ...sampleMovies };
    this.setState({
      movies,
    });
  };

  openModalNav = () => {
    const cartModalOpen = true;
    this.setState({
      cartModalOpen,
    });
  };

  closeModalNav = (e) => {
    const cartModalOpen = false;
    this.setState({
      cartModalOpen,
    });
    console.log(this.state);
  };

  openMobileNav = () => {
    const mobileNavOpen = true;
    this.setState({
      mobileNavOpen,
    });
  };

  closeMobileNav = () => {
    const mobileNavOpen = false;
    this.setState({
      mobileNavOpen,
    });
  };

  handleClick = (e) => {
    console.log(e.currentTarget, e.target);
    if (e.currentTarget !== e.target) return;
    this.closeModalNav();
  };

  renderModal = () => {
    return (
      <div class="modal__outside" onClick={this.handleClick}>
        <AddMovieForm
          addMovie={this.addMovie}
          closeModalNav={this.closeModalNav}
        />
      </div>
    );
  };

  render() {
    return (
      <>
        <Nav
          openMobileNav={this.openMobileNav}
          closeMobileNav={this.closeMobileNav}
          mobileNavOpen={this.state.mobileNavOpen}
          storeId={this.props.match.params.theaterId}
          openModalNav={this.openModalNav}
          isAdminPage={this.state.isAdminPage}
        />
        <div className="update_movies__container">
          <button
            className="update_movies__add_movie_button"
            onClick={this.openModalNav}
          >
            &#43;
          </button>
          <h1 className="update_movies__heading">Update Movies</h1>
          {Object.keys(this.state.movies).map((movieKey) => {
            return (
              <EditMovieForm
                movie={this.state.movies[movieKey]}
                updateMovie={this.updateMovie}
                key={movieKey}
                index={movieKey}
                deleteMovie={this.deleteMovie}
              />
            );
          })}
          {this.state.cartModalOpen ? this.renderModal() : null}
          <button className="add_sample_movies" onClick={this.loadSampleMovies}>
            Load Sample Movies
          </button>
        </div>
      </>
    );
  }
}

export default UpdateMovies;
