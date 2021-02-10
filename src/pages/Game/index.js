import React, { useState } from 'react';

import Container from '@material-ui/core/Container';

import './styles.scss';
import { initialGameState } from '../../utils/initialStates';
import GameContext from '../../contexts/GameContext';
import Mode from '../../components/Mode';
import Clicker from '../../components/Clicker';
import Result from '../../components/Result';

const Game = () => {
  const [game, setGame] = useState(initialGameState);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <Container component="div" maxWidth="md" className="mx-auto py-3">
        <Mode isStarted={isStarted} isFinished={isFinished} />
        <Clicker
          isStarted={isStarted}
          setIsStarted={setIsStarted}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
        />
        {isFinished && (
          <Result setIsStarted={setIsStarted} setIsFinished={setIsFinished} />
        )}
      </Container>
    </GameContext.Provider>
  );
};

export default Game;
