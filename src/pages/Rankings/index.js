import React from 'react';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import './styles.scss';
import RankingsModeList from '../../components/RankingsModeList';
import EmptyRankings from '../../components/EmptyRankings';
import gameService from '../../services/gameService';
import rankingsService from '../../services/rankingsService';

const Rankings = () => {
  const rankedModes = gameService.getRankedGameModes();
  const wereAnyGamesPlayed = gameService.getGames().length !== 0;
  const history = useHistory();

  const onRankingsReset = () => {
    const confirm = window.confirm(
      'RankingsItem of all users will be reset.\n' +
        'Are you sure you want to continue?'
    );
    if (confirm) {
      rankingsService.resetRankings();
      history.push('/game');
    }
  };

  return (
    <Container component="div" maxWidth="md" className="mx-auto py-3">
      {rankedModes.map((mode, index) => {
        return <RankingsModeList key={index + mode} mode={mode} />;
      })}
      {!wereAnyGamesPlayed && <EmptyRankings />}
      {wereAnyGamesPlayed && (
        <div className="rankings-actions flex-row justify-center">
          <Button
            variant="contained"
            className="btn btn-reset"
            color="secondary"
            onClick={onRankingsReset}
          >
            Reset rankings
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Rankings;
