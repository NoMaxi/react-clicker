import React, { useContext, useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './styles.scss';
import UserContext from '../../contexts/UserContext';
import GameContext from '../../contexts/GameContext';
import userService from '../../services/userService';
import gameService from '../../services/gameService';

const Clicker = ({ isStarted, setIsStarted, isFinished, setIsFinished }) => {
  const { user } = useContext(UserContext);
  const {
    game: { mode },
    setGame,
  } = useContext(GameContext);
  const [timer, setTimer] = useState(gameService.getGameDuration(mode));
  const [count, setCount] = useState(0);
  const isGameBeingRestarted = !isStarted && !isFinished;

  useEffect(() => {
    if (isGameBeingRestarted) {
      setTimer(gameService.getGameDuration(mode));
    }
  }, [mode, isStarted, isFinished]);

  useEffect(() => {
    let intervalId;

    if (isStarted) {
      intervalId = window.setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      if (timer === 0) {
        setIsFinished(true);
        window.clearInterval(intervalId);
        handleGameResult();
      }
    }

    if (isGameBeingRestarted) {
      setCount(0);
    }

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isStarted, timer]);

  const handleGameResult = () => {
    const currentGame = {
      id: gameService.generateGameId(),
      mode,
      username: user.name,
      result: count,
    };
    setGame(currentGame);
    userService.updateUserGames(currentGame);
  };

  const onStart = () => {
    setIsStarted(true);
  };

  const onClickCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <div className="card flex-col">
      <Typography
        component="h2"
        variant="h4"
        className="card-title text-center"
      >
        Click to win!
      </Typography>

      <div className="flex-row align-center mt-2">
        <div className="clicker-actions flex-row align-center">
          <Button
            variant="contained"
            className="btn btn-clicker"
            color="secondary"
            disabled={isFinished}
            onClick={isStarted ? onClickCount : onStart}
          >
            {isStarted ? 'Click to count' : 'Start'}
          </Button>
        </div>
        <div className="clicker-info text-bold flex-col justify-center align-center">
          <div className="clicker-count flex-col justify-center align-center">
            <span>Clicks made:</span>
            <span className="clicker-count-value">{count}</span>
          </div>
          <div className="clicker-time flex-col justify-center align-center">
            <span>Time left:</span>
            <span className="clicker-time-value">{timer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clicker;
