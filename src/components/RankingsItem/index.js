import React from 'react';

import './styles.scss';

const RankingsItem = ({ ranking: { clickSpeed, rank, result, username } }) => {
  return (
    <>
      <td className="rank">{rank}</td>
      <td className="username">{username}</td>
      <td className="result">{result}</td>
      <td className="speed">{clickSpeed}</td>
    </>
  );
};

export default RankingsItem;
