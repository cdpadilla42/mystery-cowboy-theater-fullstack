import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Nav extends Component {
  static propTypes = {
    openMobileNav: PropTypes.func,
    mobileNavOpen: PropTypes.bool,
    closeMobileNav: PropTypes.func,
    storeId: PropTypes.string,
    openModalNav: PropTypes.func,
    isAdminPage: PropTypes.bool,
    calcTotalTickets: PropTypes.func,
  };

  renderOrderButton = () => {
    return (
      <li>
        <button
          tabIndex="0"
          class="nav__link"
          onClick={this.props.openModalNav}
        >
          {`View Order (${this.props.calcTotalTickets()})`}
        </button>
      </li>
    );
  };

  renderOrderButtonMobile = () => {
    return (
      <button
        tabIndex="0"
        class="nav__link"
        onClick={() => {
          this.props.openModalNav();
          this.props.closeMobileNav();
        }}
        className="mobile_nav__button"
      >
        {`View Order (${this.props.calcTotalTickets()})`}
      </button>
    );
  };

  render() {
    return (
      <>
        <nav>
          <div className="nav__container">
            <a href={`/theater/${this.props.storeId}`} className="nav__logo">
              Myster Cowboy Theater
            </a>
            <a
              href={`/theater/${this.props.storeId}`}
              className="nav__location"
            >
              {this.props.storeId}
            </a>
            <ul className="nav__menu">
              <li>
                <a href={`/theater/${this.props.storeId}/update-movies`}>
                  Edit Movies
                </a>
              </li>
              {/* <li>
                <a href="/">Pick Location</a>
              </li> */}
              {this.props.isAdminPage ? null : this.renderOrderButton()}
            </ul>
            <div className="nav__mobile_content">
              <button
                className="nav__hamburger"
                onClick={this.props.openMobileNav}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </nav>
        <div
          className={
            this.props.mobileNavOpen ? 'mobile_nav open' : 'mobile_nav'
          }
        >
          <button
            className="mobile_nav__close"
            onClick={this.props.closeMobileNav}
          >
            &times;
          </button>
          <a
            className="mobile_nav__item"
            href={`/theater/${this.props.storeId}/update-movies`}
          >
            Edit Movies
          </a>
          {/* <a className="mobile_nav__item" href="/">
            Pick Location
          </a> */}
          {this.props.isAdminPage ? null : this.renderOrderButtonMobile()}
        </div>
      </>
    );
  }
}

export default Nav;
