import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { priceConverter } from '../helper';
import CartItem from './CartItem';

class Order extends Component {
  static propTypes = {
    order: PropTypes.object,
    movies: PropTypes.object,
    deleteFromOrder: PropTypes.func,
    subtractTicketFromOrder: PropTypes.func,
    addToOrder: PropTypes.func,
  };

  renderOrderItem = (key) => {
    const order = this.props.order;
    const movies = this.props.movies;
    const movie = movies[key];
    if (!movie) return null;
    return (
      <p key={key}>
        {`${order[key]} tickets for ${movie.name}`}
        <button
          id="order_delete"
          onClick={() => this.props.deleteFromOrder(key)}
          className="delete-order-item"
        >
          &times;
        </button>
      </p>
    );
  };

  renderTotalTicketQuantity = () => {
    return Object.keys(this.props.order).reduce((p, c) => {
      return p + this.props.order[c];
    }, 0);
  };

  calculateTicketTotal = () => {
    const movies = this.props.movies;
    const order = this.props.order;
    const keys = Object.keys(order);
    const total = keys.reduce((prevTotal, key) => {
      if (!movies[key]) return null;
      // multiply number of tickets by price
      const moviePrice = movies[key].price;
      const movieTotal = order[key] * moviePrice;
      // add to prev total
      return prevTotal + movieTotal;
    }, 0);

    return total;
  };

  calculateOrderTotal = () => {
    return this.calculateTicketTotal() + 300;
  };

  renderTicketTotal = () => {
    return (
      <div className="cart__pricing_display">
        <div class="cart__items">
          <span class="cart__items_quantity">
            tickets: {this.renderTotalTicketQuantity()}
          </span>
          <span class="cart__items_price">
            {priceConverter(this.calculateTicketTotal())}
          </span>
        </div>
        <div class="cart__shipping">
          <span class="cart__fee">Online Fee</span>
          <span class="cart__fee_price">$3.00</span>
        </div>
        <div class="cart__subtotal">
          <span class="cart__subtotal">Subtotal</span>
          <span class="cart__subtotal_price">
            {priceConverter(this.calculateOrderTotal())}
          </span>
        </div>
      </div>
    );
  };

  render() {
    const movies = this.props.movies;
    const order = this.props.order;
    const keys = Object.keys(order);
    const total = keys.reduce((prevTotal, key) => {
      if (!movies[key]) return null;
      // multiply number of tickets by price
      const moviePrice = movies[key].price;
      const movieTotal = order[key] * moviePrice;
      // add to prev total
      return prevTotal + movieTotal;
    }, 0);

    return (
      <section className="cart">
        <div class="cart__display_items">
          {Object.keys(order).map((key) => {
            return (
              <CartItem
                deleteFromOrder={this.props.deleteFromOrder}
                index={key}
                key={key}
                movies={movies}
                subtractTicketFromOrder={this.props.subtractTicketFromOrder}
                order={this.props.order}
                addToOrder={this.props.addToOrder}
              />
            );
          })}
        </div>
        <hr />
        {this.renderTicketTotal()}
      </section>
    );

    return (
      <div>
        <h2>Your tix: 🎟</h2>
        {Object.keys(order).map((key) => {
          return this.renderOrderItem(key);
        })}
        <div className="total">
          <strong>
            <div>
              Total:
              <span id="total_number">{priceConverter(total)}</span>
            </div>
          </strong>
        </div>
      </div>
    );
  }
}

export default Order;
