import authService from './authService';

const userService = {
  setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  },

  getUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      this.setUsers([]);
    }

    return JSON.parse(localStorage.getItem('users'));
  },

  getUserByName(name) {
    return this.getUsers().find((user) => user.name === name);
  },

  isNewUser(name) {
    return !this.getUsers().some((user) => user.name === name);
  },

  generateUserId() {
    const users = this.getUsers();
    return users.length === 0
      ? 1
      : [...users].sort((a, b) => b.id - a.id)[0].id + 1;
  },

  addNewUser(name) {
    const users = this.getUsers();
    const newUserId = this.generateUserId();
    const newUser = {
      id: newUserId,
      name,
      gamesPlayed: 0,
      games: [],
    };

    users.push(newUser);
    this.setUsers(users);
  },

  updateUserGames(game) {
    const currentUser = authService.currentUser;
    currentUser.games.push(game);
    currentUser.gamesPlayed = currentUser.games.length;
    authService.currentUser = currentUser;

    const users = this.getUsers();
    const currentUserIndex = users.findIndex(
      (user) => user.name === currentUser.name
    );
    users[currentUserIndex] = { ...currentUser };
    this.setUsers(users);
  },
};

export default userService;
