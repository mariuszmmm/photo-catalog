import { useEffect } from "react";

const useRemainingSessionTime = (state, setState, session, setSession) => {
  useEffect(() => {
    const iterval = setInterval(() => {
      if (state.user.isLoggedIn) {
        const time = Math.floor(new Date().getTime() / 1000);
        const remaining = session.sessionTime.end - time;

        if (remaining > 0) {
          setSession((prevState) => (
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
  }, [state.user, session.sessionTime, setState, setSession]);

  const remainingTime = session.sessionTime.remaining;
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