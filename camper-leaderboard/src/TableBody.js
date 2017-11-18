import React, { Component } from 'react';
import Row from './Row';
import _ from 'lodash';

class TableBody extends Component {
  renderContent() {
    return _.chain(this.props.data)
      .sortBy(this.props.sortBy)
      .reverse()
      .map((entry, rank) => {
        return (
          <Row
            key={rank + 1}
            name={entry.username}
            rank={rank + 1}
            recentPoints={entry.recent}
            overalPoints={entry.alltime}
          />
        );
      })
      .value();
  }
  render() {
    return <tbody>{this.renderContent()}</tbody>;
  }
}

export default TableBody;
