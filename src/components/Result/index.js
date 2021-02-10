import React, { useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './styles.scss';
import GameContext from '../../contexts/GameContext';
import gameService from '../../services/gameService';
import { initialGameState } from '../../utils/initialStates';

const Result = ({ setIsStarted, setIsFinished }) => {
  const { game, setGame } = useContext(GameContext);
  const message = gameService.getResultMessage(game);

  const onPlayAgain = () => {
    setGame((prevGame) => ({ ...initialGameState, mode: prevGame.mode }));
    setIsStarted(false);
    setIsFinished(false);
  };

  return (
    <div className="card flex-col">
      <Typography
        component="h2"
        variant="h4"
        className="card-title text-center"
      >
        Results
      </Typography>

      <div className="flex-col">
        <div className="result-message text-bold flex-col justify-center align-center">
          <p className="result-message-text">{message}</p>
        </div>
        <div className="result-actions flex-row justify-center align-center">
          <Button
            variant="contained"
            className="btn btn-restart"
            color="primary"
            onClick={onPlayAgain}
          >
            Play again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
