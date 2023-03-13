import React, { Component } from 'react';

export class NotFound extends Component {
  static propTypes = {};
  history = window.history;
  render() {
    return (
      <div>
        <h2>NotFound</h2>
        <button onClick={() => this.history.back()}>Back</button>
      </div>
    );
  }
}

export default NotFound;
