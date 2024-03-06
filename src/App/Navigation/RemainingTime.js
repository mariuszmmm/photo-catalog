export const RemainingTime = ({ state }) => {

  if (!state.isLoggedIn) return
  console.log(state)
  // console.log(state.sessionTime)

  const seconds = Math.floor(state.remainingTime % 60).toString().padStart(2, '0');
  const minutes = Math.floor((state.remainingTime / 60) % 60).toString().padStart(2, '0');
  const hours = Math.floor(state.remainingTime / 60 / 60).toString().padStart(2, '0');

  // console.log(state.sessionTime)
  console.log(seconds)
  console.log(minutes);
  console.log(hours);


  return (
    <p>
      czas do końca sesji{" : "} 
      {hours}:{minutes}:{seconds}
    </p>
  )

};