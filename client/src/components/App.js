import React from 'react';
import '../css/theater.css';
import Nav from './Nav';
import MovieListing from './MovieListing';
import Order from './Order';
import MovieDisplay from './MovieDisplay';
import UpdateMovies from './UpdateMovies';
import sampleMovies from '../sample-movies';
import base from '../base';

class App extends React.Component {
  state = {
    movies: {},
    order: {},
    mobileNavOpen: false,
    cartModalOpen: false,
    selectedMovie: null,
    isAdminPage: false,
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

    // remove key listener
    document.removeEventListener('keyup', this.handleKeyup);
  }

  handleKeyup = (e) => {
    if (e.key === 'Escape') {
      this.closeModalNav();
    }
  };

  handleClick = (e) => {
    console.log(e.currentTarget, e.target);
    if (e.currentTarget !== e.target) return;
    this.closeModalNav();
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] ? (order[key] = order[key] + 1) : (order[key] = 1);
    this.setState({
      order,
    });
  };

  subtractTicketFromOrder = (key) => {
    const order = { ...this.state.order };
    if (order[key] === 1) return;
    order[key] = order[key] - 1;
    this.setState({
      order,
    });
  };

  deleteFromOrder = (key) => {
    const order = {
      ...this.state.order,
    };
    delete order[key];
    this.setState({
      order,
    });
  };

  selectMovie = (key) => {
    console.log(key);
    const selectedMovie = key;
    this.setState({
      selectedMovie,
    });
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
  };

  calcTotalTickets = () => {
    const quantity = Object.keys(this.state.order).reduce(
      (prev, movie) => prev + this.state.order[movie],
      0
    );
    return quantity;
  };

  renderModal = () => {
    return (
      <div class="modal__outside" onClick={this.handleClick}>
        <div class="modal__inner">
          <Order
            movies={this.state.movies}
            order={this.state.order}
            deleteFromOrder={this.deleteFromOrder}
            subtractTicketFromOrder={this.subtractTicketFromOrder}
            addToOrder={this.addToOrder}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="theater_app">
        <Nav
          openMobileNav={this.openMobileNav}
          closeMobileNav={this.closeMobileNav}
          mobileNavOpen={this.state.mobileNavOpen}
          storeId={this.props.match.params.theaterId}
          openModalNav={this.openModalNav}
          isAdminPage={this.state.isAdminPage}
          calcTotalTickets={this.calcTotalTickets}
        />
        <main>
          <MovieListing
            movies={this.state.movies}
            selectMovie={this.selectMovie}
          />
          <MovieDisplay
            selectedMovie={this.state.selectedMovie}
            addToOrder={this.addToOrder}
            movies={this.state.movies}
          />
        </main>
        {this.state.cartModalOpen && this.renderModal()}
        <div className="right_pane">
          {/* <UpdateMovies
            movies={this.state.movies}
            addMovie={this.addMovie}
            updateMovie={this.updateMovie}
            loadSampleMovies={this.loadSampleMovies}
            deleteMovie={this.deleteMovie}
          /> */}
        </div>
      </div>
    );
  }
}

export default App;
