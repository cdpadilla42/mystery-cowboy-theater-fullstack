import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO ------------------------------------
// TODO Update this from the boiler plate to desired view
// TODO ------------------------------------

class LoginPage extends Component {
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

export default LoginPage;
