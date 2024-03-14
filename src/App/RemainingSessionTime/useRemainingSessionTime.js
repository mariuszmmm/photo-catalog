import { useEffect } from "react";

const useRemainingSessionTime = (state, setState) => {
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

  const remainingTime = state.sessionTime.remaining;
  const hours = Math.floor(remainingTime / 60 / 60).toString().padStart(2, '0');
  const minutes = Math.floor((remainingTime / 60) % 60).toString().padStart(2, '0');
  const seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');

  return {
    hours,
    minutes,
    seconds,
  }
};

export default useRemainingSessionTime;