import React, { Component } from 'react';
import axios from 'axios';
import Row from './Row';
import _ from 'lodash';

class Table extends Component {
  state = { sortBy: 'recent-points', downloaded: false };

  async getData() {
    const { data } = await axios.get(
      'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
    );
    this.data = data;
    if (this.data) {
      this.setState({ downloaded: true });
    }
  }

  componentDidMount() {
    this.getData();
  }
  renderContent(downloaded) {
    return _.map(this.data, (entry, rank) => {
      return (
        <Row
          key={rank}
          name={entry.username}
          rank={rank}
          recentPoints={entry.recent}
          overalPoints={entry.alltime}
        />
      );
    });
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
        <tbody>{this.renderContent(this.state.downloaded)}</tbody>
      </table>
    );
  }
}

export default Table;
