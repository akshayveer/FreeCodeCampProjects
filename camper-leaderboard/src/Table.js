import React, { Component } from 'react';
import axios from 'axios';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

class Table extends Component {
  state = { sortBy: 'recent', data: [] };

  async getData() {
    try {
      const { data } = await axios.get(
        'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
      );

      if (data) {
        this.setState({ data });
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.getData();
  }

  changeSortKey() {
    if (this.state.sortBy === 'recent') {
      this.setState({ sortBy: 'alltime' });
    } else {
      this.setState({ sortBy: 'recent' });
    }
  }
  render() {
    return (
      <table
        className="striped responsive-table"
        style={{ width: '50%', margin: 'auto' }}
      >
        <TableHeader
          sortBy={this.state.sortBy}
          onClick={this.changeSortKey.bind(this)}
        />
        <TableBody data={this.state.data} sortBy={this.state.sortBy} />
      </table>
    );
  }
}

export default Table;
