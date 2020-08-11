import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';

// TODO ------------------------------------
// TODO Update this from the boiler plate to desired view
// TODO ------------------------------------

class LoginPage extends Component {
  theaterNameRef = React.createRef();
  usernameRef = React.createRef();
  pwRef = React.createRef();

  handleFormSubmit = (e) => {
    e.preventDefault();
    // // store theater name
    // const theaterName = this.theaterNameRef.current.value;
    // this.props.history.push(`/theater/${theaterName}`);
  };

  render() {
    return (
      <div className="login_page__container">
        <h1 className="login_page__heading">Chose your theater</h1>
        <form onSubmit={this.handleFormSubmit} className="login_page__form">
          <label className="login_page__field" htmlFor="username">
            <span className="login_page__label">Username</span>
            <input
              type="text"
              name="username"
              id="username"
              ref={this.usernameRef}
            />
          </label>
          <label htmlFor="pw" className="login_page__field">
            <span className="login_page__label">Password</span>
            <input type="password" name="pw" id="pw" ref={this.pw} />
          </label>
          <div className="login_page__button_container">
            <button type="submit" className="login_page__login_button">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
