import { useEffect } from "react";
import { Info } from "../Navigation/styled";

export const RemainingSessionTime = ({ state, setState }) => {
  useEffect(() => {
    const iterval = setInterval(() => {
      if (state.isLoggedIn) {
        const time = Math.floor(new Date().getTime() / 1000);
        const remainingSessionTime = state.sessionTime - time;

        if (remainingSessionTime > 0) {
          setState((prevState) => ({ ...prevState, remainingSessionTime }))
        } else {
          sessionStorage.removeItem("token");
          setState(prevState => ({
            ...prevState,
            isLoggedIn: false,
            username: null,
            isAdmin: false,
            remainingSessionTime: 0,
          }));
        }
      } else clearInterval(iterval);

    }, 1000)

    return () => clearInterval(iterval);
  }, [state.isLoggedIn, state.sessionTime, setState]);

  if (!state.isLoggedIn) return
  const seconds = Math.floor(state.remainingSessionTime % 60).toString().padStart(2, '0');
  const minutes = Math.floor((state.remainingSessionTime / 60) % 60).toString().padStart(2, '0');
  const hours = Math.floor(state.remainingSessionTime / 60 / 60).toString().padStart(2, '0');

  return (
    <Info>
      czas do końca sesji{": "}
      {hours}:{minutes}:{seconds}
    </Info>
  )
};