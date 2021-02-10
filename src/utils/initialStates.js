import { modesList } from './modes';

export const initialUserState = {
  id: null,
  name: '',
  gamesPlayed: null,
  games: [],
};

export const initialGameState = {
  id: null,
  mode: modesList[0],
  username: '',
  result: null,
};

export const initialRankingState = {
  username: '',
  gameId: null,
  mode: modesList[0],
  result: null,
  clickSpeed: null,
};
