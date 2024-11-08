import { Info } from "../Navigation/styled";
import useRemainingSessionTime from "./useRemainingSessionTime";

export const RemainingSessionTime = ({ state, setState, session, setSession }) => {
  const { hours, minutes, seconds } = useRemainingSessionTime(state, setState, session, setSession);

  if (state?.user?.isLoggedIn) return (
    <Info>
      czas do końca sesji{": "}
      {hours}:{minutes}:{seconds}
    </Info>
  )
};