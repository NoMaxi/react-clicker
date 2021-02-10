import userService from './userService';
import rankingsService from './rankingsService';

const gameService = {
  getGames() {
    let games = [];
    const users = userService.getUsers();

    for (const user of users) {
      if (user.games.length !== 0) {
        games = [...games, ...user.games];
      }
    }

    return games;
  },

  generateGameId() {
    return this.getGames().length + 1;
  },

  getRankedGameModes() {
    return [...new Set(this.getGames().map((game) => game.mode))].sort(
      (a, b) => this.getGameDuration(a) - this.getGameDuration(b)
    );
  },

  getGameDuration(mode) {
    return +mode.replace(' seconds', '');
  },

  getBasicMessage(username, result, clickSpeed) {
    return (
      `${username}, your result: ${result} clicks, average click speed: ` +
      `${clickSpeed} clicks per second. `
    );
  },

  getSpecialMessage(mode, rank, result, record) {
    const specialMessageTypes = {
      NEW_HERO: `Congratulations, you have beaten the previous record! Now you are the new CLICKER HERO!`,
      VERY_GOOD: `Very good result! Currently your rank in '${mode}'-mode is ${rank}. Train more to become the new CLICKER HERO!`,
      GOOD: `Good result! Currently your rank in '${mode}'-mode is ${rank}. Train more to achieve better results!`,
      NOT_BAD: `Not bad! Your rank in '${mode}'-mode is ${rank}. Train more to achieve better results!`,
      BAD: `You were too slow... Your rank in '${mode}'-mode is ${rank}. You should train much more to achieve better results!`,
    };

    let specialMessage;
    switch (true) {
      case !record || result > record:
        specialMessage = specialMessageTypes.NEW_HERO;
        break;
      case result / record > 0.9:
        specialMessage = specialMessageTypes.VERY_GOOD;
        break;
      case result / record > 0.8:
        specialMessage = specialMessageTypes.GOOD;
        break;
      case result / record > 0.6:
        specialMessage = specialMessageTypes.NOT_BAD;
        break;
      default:
        specialMessage = specialMessageTypes.BAD;
    }

    return specialMessage;
  },

  getResultMessage(game) {
    const { mode, result, username } = game;
    const currentGameRanking = rankingsService.getCurrentGameRanking(game);

    if (currentGameRanking) {
      const { clickSpeed, rank } = currentGameRanking;
      const record = rankingsService.getRecordRankingBeforeCurrentGame(game)
        ?.result;
      const basicMessage = this.getBasicMessage(username, result, clickSpeed);
      const specialMessage = this.getSpecialMessage(mode, rank, result, record);

      return basicMessage + specialMessage;
    }
  },
};

export default gameService;
