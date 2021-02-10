import authService from './authService';
import userService from './userService';

const rankingsService = {
  getRankings() {
    const users = userService.getUsers();
    const rankings = [];

    for (const user of users) {
      if (user.games.length !== 0) {
        for (const game of user.games) {
          const ranking = {
            username: user.name,
            gameId: game.id,
            mode: game.mode,
            result: game.result,
            clickSpeed: +(
              game.result / +game.mode.replace(' seconds', '')
            ).toFixed(2),
          };
          rankings.push(ranking);
        }
      }
    }

    return rankings;
  },

  getRankingsByMode(gameMode, displayedLimit = Infinity) {
    return this.getRankings()
      .filter((ranking) => ranking.mode === gameMode)
      .sort((a, b) => b.result - a.result)
      .map((ranking, index) => ({ ...ranking, rank: index + 1 }))
      .slice(0, displayedLimit);
  },

  getRecordRankingBeforeCurrentGame(game) {
    return this.getRankingsByMode(game.mode).filter(
      (ranking) => ranking.gameId !== game.id
    )[0];
  },

  getCurrentGameRanking(game) {
    const rankingsByMode = this.getRankingsByMode(game.mode);
    if (rankingsByMode) {
      return rankingsByMode.find((ranking) => ranking.gameId === game.id);
    }
  },

  resetRankings() {
    const users = this.userService.getUsers();
    for (const user of users) {
      user.games.length = 0;
    }
    userService.setUsers(users);

    const currentUser = authService.currentUser;
    currentUser.games.length = 0;
    authService.currentUser = currentUser;
  },
};

export default rankingsService;
