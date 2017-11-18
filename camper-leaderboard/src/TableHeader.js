import React, { Component } from 'react';

class TableHeader extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  renderRecentColumn() {
    if (this.props.sortBy === 'recent') {
      return (
        <th>
          Points in past 30 days
          <i className="material-icons">arrow_drop_down</i>
        </th>
      );
    } else {
      return (
        <th>
          <a onClick={this.props.onClick}>Points in past 30 days </a>
        </th>
      );
    }
  }

  renderAllTimeColumn() {
    if (this.props.sortBy === 'alltime') {
      return (
        <th>
          {' '}
          All time points <i className="material-icons">arrow_drop_down</i>
        </th>
      );
    } else {
      return (
        <th>
          <a onClick={this.props.onClick}>All time points</a>
        </th>
      );
    }
  }
  render() {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          {this.renderRecentColumn()}
          {this.renderAllTimeColumn()}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
