export const logout = (setState) => {
  sessionStorage.removeItem("token");
  setState((prevState) => ({
    ...prevState,
    user: {},
    sessionTime: {},
  }));
};