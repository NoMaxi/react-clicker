import React from 'react';

import './styles.scss';

const EmptyRankings = () => {
  return (
    <div
      className="empty-rankings-container card text-bold
                 flex-row justify-center align-center"
    >
      <span>No ranking tables found. Play games to earn a rank.</span>
    </div>
  );
};

export default EmptyRankings;
