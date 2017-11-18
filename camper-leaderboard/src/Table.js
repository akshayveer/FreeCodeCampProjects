import React, { Component } from 'react';
import axios from 'axios';
import Row from './Row';
class Table extends Component {
  state = { sortBy: 'recent-points', data: [] };

  async getData() {
    const { data } = await axios.get(
      'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
    );
    if (data) {
      this.setState({ data });
    }
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <table
        className="striped responsive-table"
        style={{ width: '50%', margin: 'auto' }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th>Points in past 30 days</th>
            <th>All time points</th>
          </tr>
        </thead>
      </table>
    );
  }
}

export default Table;
