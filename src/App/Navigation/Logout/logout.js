
export const logout = (setState) => {
  sessionStorage.removeItem("token");
  setState((prevState) => ({
    ...prevState,
    isLoggedIn: false,
    username: null,
    isAdmin: false,
    sessionTime: null,
    remainingSessionTime: 0,
  }));
};