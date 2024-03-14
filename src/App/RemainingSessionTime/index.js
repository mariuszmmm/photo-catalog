import { Info } from "../Navigation/styled";
import useRemainingSessionTime from "./useRemainingSessionTime";

export const RemainingSessionTime = ({ state, setState }) => {
  const { hours, minutes, seconds } = useRemainingSessionTime(state, setState);

  if (state.user.isLoggedIn) return (
    <Info>
      czas do końca sesji{": "}
      {hours}:{minutes}:{seconds}
    </Info>
  )
};