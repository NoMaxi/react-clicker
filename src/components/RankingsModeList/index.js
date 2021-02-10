import React from 'react';

import Typography from '@material-ui/core/Typography';

import './styles.scss';
import rankingsService from '../../services/rankingsService';
import RankingsItem from '../RankingsItem';

const RankingsModeList = ({ mode }) => {
  const rankings = rankingsService.getRankingsByMode(mode, 10);

  return (
    <div className="card rankings-card flex-col align-center">
      <Typography
        className="card-title rankings-title text-center"
        component="h2"
        variant="h4"
      >
        {mode}
      </Typography>

      <table className="rankings-table w-100 text-center mt-1">
        <thead className="text-bold">
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Result</th>
            <th>Click speed</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking) => {
            return (
              <tr className="rankings-item">
                <RankingsItem key={ranking.gameId} ranking={ranking} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RankingsModeList;
