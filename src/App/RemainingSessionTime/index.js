import { useEffect } from "react";
import { Info } from "../Navigation/styled";

export const RemainingSessionTime = ({ state, setState }) => {
  useEffect(() => {
    const iterval = setInterval(() => {
      if (state.user.isLoggedIn) {
        const time = Math.floor(new Date().getTime() / 1000);
        const remaining = state.sessionTime.end - time;

        if (remaining > 0) {
          setState((prevState) => (
            {
              ...prevState,
              sessionTime: { ...prevState.sessionTime, remaining }
            }
          ))
        } else {
          sessionStorage.removeItem("token");
          setState(prevState => (
            {
              ...prevState,
              user: {},
              sessionTime: {},
            }
          ));
        }
      } else clearInterval(iterval);

    }, 1000)

    return () => clearInterval(iterval);
  }, [state.user, state.sessionTime, setState]);

  if (!state.user.isLoggedIn) return
  const remainingTime = state.sessionTime.remaining;
  const seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
  const minutes = Math.floor((remainingTime / 60) % 60).toString().padStart(2, '0');
  const hours = Math.floor(remainingTime / 60 / 60).toString().padStart(2, '0');

  return (
    <Info>
      czas do końca sesji{": "}
      {hours}:{minutes}:{seconds}
    </Info>
  )
};