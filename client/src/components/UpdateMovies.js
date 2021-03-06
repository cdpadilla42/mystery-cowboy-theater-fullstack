import React, { Component } from 'react';
import '../css/theater.css';
import sampleMovies from '../sample-movies';
import EditMovieForm from './EditMovieForm';
import AddMovieForm from './AddMovieForm';
import Nav from './Nav';
import Login from './LoginPage';
import base from '../base';
import axios from 'axios';

class UpdateMovies extends Component {
  state = {
    movies: {},
    order: {},
    mobileNavOpen: false,
    cartModalOpen: false,
    selectedMovie: null,
    isAdminPage: true,
    user: {},
  };

  componentDidMount() {
    const params = this.props.match.params.theaterId;
    const orderLocalStorage = JSON.parse(localStorage.getItem(`${params}`));
    if (orderLocalStorage) {
      this.setState({
        order: orderLocalStorage,
      });
    }

    // // Update Movies from firebase
    // this.ref = base.syncState(`${params}/movies`, {
    //   context: this,
    //   state: 'movies',
    // });
    // Load backend through axios
    console.log('running axios at ' + `/api/${params}`);
    axios
      .get(`/api/${params}`)
      .then((movies) => {
        console.log(movies.data);
        const moviesObj = {};
        movies.data.forEach((movie) => (moviesObj[movie._id] = movie));
        console.log(moviesObj);
        this.setState({
          movies: moviesObj,
        });
      })
      .catch((err) => console.log(err));

    // Add key functionality
    document.addEventListener('keyup', this.handleKeyup);
  }

  componentDidUpdate() {
    const params = this.props.match.params.theaterId;
    const order = JSON.stringify(this.state.order);
    localStorage.setItem(`${params}`, order);
  }

  componentWillUnmount() {
    // base.removeBinding(this.ref);
  }

  addMovie = (movie) => {
    this.saveNewMovieToState(movie);
    this.saveNewMovieToDB(movie);
  };

  saveNewMovieToState = (movie) => {
    const movieKey = `movie${Date.now()}`;
    const movies = {
      ...this.state.movies,
      [movieKey]: movie,
    };
    this.setState({
      movies,
    });
  };

  saveNewMovieToDB = async (movie) => {
    const axiosOptions = {
      headers: {
        authorization: `Bearer ${this.state.user.token}`,
      },
    };

    const theaterName = this.props.match.params.theaterId;
    const newMovie = await axios
      .post(`/api/${theaterName}`, movie, axiosOptions)
      .catch((err) => console.log(err));
    console.log(newMovie);
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

  saveMovieUpdateToDB = async (id) => {
    const axiosOptions = {
      headers: {
        authorization: `Bearer ${this.state.user.token}`,
      },
    };
    const theaterName = this.props.match.params.theaterId;
    this.saveButtonSaving();
    const newMovie = await axios
      .put(`/api/${theaterName}/${id}`, this.state.movies[id], axiosOptions)
      .catch((err) => console.log(err));

    console.log(newMovie);
    if (newMovie) this.saveButtonSuccess();
  };

  saveButtonSaving = () => {
    const saveButton = document.querySelector('#save_btn');
    saveButton.classList.add('saving');
    saveButton.textContent = 'Saving...';
  };

  saveButtonSuccess = () => {
    const saveButton = document.querySelector('#save_btn');
    saveButton.classList.remove('saving');
    saveButton.classList.add('save_success');
    saveButton.textContent = 'Changes Saved!';
    setTimeout(this.revertSaveButton, 3000);
  };

  revertSaveButton = () => {
    const saveButton = document.querySelector('#save_btn');
    saveButton.classList.remove('save_success');
    saveButton.textContent = 'Save Changes';
  };

  deleteMovie = (movieKey) => {
    this.deleteMovieFromState(movieKey);
    this.deleteMovieFromDB(movieKey);
  };

  deleteMovieFromDB = async (movieKey) => {
    const axiosOptions = {
      headers: {
        authorization: `Bearer ${this.state.user.token}`,
      },
    };
    const theaterName = this.props.match.params.theaterId;
    console.log(`Deleting ${movieKey} from DB`);
    const wasSuccessful = await axios
      .delete(`/api/${theaterName}/${movieKey}`, axiosOptions)
      .catch((err) => console.log(err));
    console.log(wasSuccessful);
  };

  deleteMovieFromState = (movieKey) => {
    const movies = {
      ...this.state.movies,
    };
    delete movies[movieKey];
    this.setState({
      movies,
    });
  };

  loadSampleMovies = () => {
    const movies = { ...this.state.movies, ...sampleMovies };
    this.setState({
      movies,
    });
    this.loadSampleMoviesToDB();
  };

  loadSampleMoviesToDB = () => {
    console.log('Adding sample movies to DB');
    Object.keys(sampleMovies).forEach(async (key) => {
      await this.saveNewMovieToDB(sampleMovies[key]);
    });
    console.log('Sample Movies added to DB');
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

  renderLoadSampleMoviesBttn = () => {
    return (
      <button className="add_sample_movies" onClick={this.loadSampleMovies}>
        Load Sample Movies
      </button>
    );
  };

  storeUser = (user, token) => {
    const newUser = {
      ...user,
      token,
    };
    this.setState({
      user: newUser,
    });
  };

  render() {
    if (!this.state.user.token) {
      return <Login storeUser={this.storeUser} />;
    }

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
                saveMovieUpdateToDB={this.saveMovieUpdateToDB}
              />
            );
          })}
          {this.state.cartModalOpen ? this.renderModal() : null}
          {Object.keys(this.state.movies).length > 0
            ? null
            : this.renderLoadSampleMoviesBttn()}
        </div>
      </>
    );
  }
}

export default UpdateMovies;
