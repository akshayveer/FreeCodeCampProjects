import React from 'react';

const Row = props => {
  return (
    <tr>
      <td>{props.rank}</td>
      <td>{props.name}</td>
      <td>{props.recentPoints}</td>
      <td>{props.overalPoints}</td>
    </tr>
  );
};

export default Row;
