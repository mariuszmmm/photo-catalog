import { useState } from "react";
import { API_URL } from "../../api";
import Img from "../../common/Img";
import ImgContainer from "../../common/ImgContainer";

export const Image = ({ task, editedTaskId, editImage }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImgContainer>
      {editedTaskId === task._id ?
        (editImage ?
          <Img isLoaded={isLoaded} src={editImage} alt="aaa" />
          :
          task.image && <Img isLoaded={isLoaded} src={`${API_URL}/Images/` + task.image} alt="image task" />)
        :
        task.image && <Img isLoaded={isLoaded} onLoad={() => setIsLoaded(true)} src={`${API_URL}/Images/` + task.image} alt="image task" />}
    </ImgContainer>
  )
};