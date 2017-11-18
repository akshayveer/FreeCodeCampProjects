import React from 'react';

export default props => {
  return (
    <tr>
      <td>{props.rank}</td>
      <td>{props.name}</td>
      <td>{props.recentPoints}</td>
      <td>{props.overalPoints}</td>
    </tr>
  );
};
