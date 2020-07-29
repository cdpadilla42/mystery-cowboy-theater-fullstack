import React, { Component } from 'react';
import propTypes from 'prop-types';
import { priceConverter } from '../helper';

class CartItem extends Component {
  static propTypes = {
    movies: propTypes.object,
    subtractTicketFromOrder: propTypes.func,
    order: propTypes.func,
  };

  render() {
    if (!this.props.movies[this.props.index]) return null;

    const movies = this.props.movies;
    const key = this.props.index;

    const imageStlye = {
      backgroundImage: `url(${movies[key].image})`,
    };

    return (
      <div class="cart__item">
        <div
          class="cart__remove_item"
          onClick={() => this.props.deleteFromOrder(this.props.index)}
          tabIndex="0"
        >
          &times;
        </div>
        <div class="cart__item_image" style={imageStlye}></div>
        <div class="cart__item_details">
          <p>{movies[key].name}</p>
          <div class="quantity_editor">
            <button
              class="quantity_editor__minus"
              onClick={() => this.props.subtractTicketFromOrder(key)}
            >
              -
            </button>
            <div class="quantity_editor__quantity">{this.props.order[key]}</div>
            <button
              class="quantity_editor__plus"
              onClick={() => this.props.addToOrder(key)}
            >
              +
            </button>
          </div>
          <p class="cart__item_price">
            {priceConverter(movies[key].price * this.props.order[key])}
          </p>
        </div>
      </div>
    );
  }
}

export default CartItem;
