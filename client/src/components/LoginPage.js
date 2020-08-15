import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import axios from 'axios';

// TODO ------------------------------------
// TODO Update this from the boiler plate to desired view
// TODO ------------------------------------

class LoginPage extends Component {
  theaterNameRef = React.createRef();
  usernameRef = React.createRef();
  pwRef = React.createRef();

  // write safe handleFormSubmit

  safeHandleFormSubmit = async (e) => {
    return this.handleFormSubmit(e).catch((err) => console.error(err));
  };

  handleFormSubmit = async (e) => {
    // TODO Handle bad logins

    e.preventDefault();
    const username = this.usernameRef.current.value;
    const password = this.pwRef.current.value;
    console.log(username, password);
    const payload = await axios.post('api/users/login', {
      username,
      password,
    });

    console.log(payload);
    const { token, user } = payload.data;
    console.log(token, user);
    this.props.history.push(`/theater/The-Domain/update-movies`);
  };

  render() {
    return (
      <div className="login_page__container">
        <h1 className="login_page__heading">Chose your theater</h1>
        <form onSubmit={this.safeHandleFormSubmit} className="login_page__form">
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
            <input type="password" name="pw" id="pw" ref={this.pwRef} />
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
