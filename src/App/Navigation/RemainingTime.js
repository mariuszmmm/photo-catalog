export const RemainingTime = ({ state }) => {

  if (!state.isLoggedIn) return
  const seconds = Math.floor(state.remainingTime % 60).toString().padStart(2, '0');
  const minutes = Math.floor((state.remainingTime / 60) % 60).toString().padStart(2, '0');
  const hours = Math.floor(state.remainingTime / 60 / 60).toString().padStart(2, '0');

  return (
    <p>
      czas do końca sesji{" : "} 
      {hours}:{minutes}:{seconds}
    </p>
  )
};