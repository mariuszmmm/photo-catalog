import { useState } from "react";
import { API_URL } from "../api/api";
import Img from "../../common/Image";
import ImgContainer from "../../common/ImageContainer";

export const Image = ({ item, editedItemId, editImage }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImgContainer>
      {editedItemId === item._id ?
        (editImage ?
          <Img $isLoaded={editImage} src={editImage} alt="aaa" />
          :
          item.image && <Img $isLoaded={item.image} src={`${API_URL}/Images/` + item.image} alt="foto" />)
        :
        item.image && <Img $isLoaded={isLoaded} onLoad={() => setIsLoaded(true)} src={`${API_URL}/Images/` + item.image} alt="foto" />}
    </ImgContainer>
  )
};