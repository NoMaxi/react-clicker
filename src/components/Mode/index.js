import React, { useContext } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import './styles.scss';
import { modesList } from '../../utils/modes';
import GameContext from '../../contexts/GameContext';

const Mode = ({ isStarted }) => {
  const { game, setGame } = useContext(GameContext);

  const handleChange = (event) => {
    setGame({ ...game, mode: event.target.value });
  };

  return (
    <div className="card mode-card flex-row justify-center">
      <FormControl component="fieldset" className="flex-col w-100">
        <FormLabel component="legend" className="card-title text-center">
          Mode
        </FormLabel>
        <RadioGroup
          className="radio-group flex-row justify-between mt-2"
          aria-label="mode"
          name="mode"
          value={game.mode}
          onChange={handleChange}
        >
          {modesList.map((mode, index) => (
            <FormControlLabel
              key={index + mode}
              className="radio-button"
              control={<Radio />}
              label={mode}
              value={mode}
              disabled={isStarted}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Mode;
