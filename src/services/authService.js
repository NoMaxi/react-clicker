const authService = {
  get isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  },

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  },

  set currentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  logoutCurrentUser() {
    localStorage.removeItem('currentUser');
  },
};

export default authService;
