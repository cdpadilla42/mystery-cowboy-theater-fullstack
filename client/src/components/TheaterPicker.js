import React, { Component } from 'react';
import { getStreetName } from '../helper';
import '../css/theaterPicker.css';

class TheaterPicker extends Component {
  theaterNameRef = React.createRef();

  handleFormSubmit = (e) => {
    e.preventDefault();
    // store theater name
    const theaterName = this.theaterNameRef.current.value;
    this.props.history.push(`/theater/${theaterName}`);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="theater-picker">
        <h1>Chose your theater</h1>
        <div className="picker">
          <input
            type="text"
            name="theater-name"
            ref={this.theaterNameRef}
            value={getStreetName()}
          />
          <button type="submit">Visit Theater Page</button>
        </div>
      </form>
    );
  }
}

export default TheaterPicker;
