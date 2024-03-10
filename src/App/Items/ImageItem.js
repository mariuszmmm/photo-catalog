import { useState } from "react";
import { API_URL } from "../api";
import Image from "../../common/Image";
import ImageContainer from "../../common/ImageContainer";

const ImageItem = ({ item, editedItemId, editImage }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageContainer>
      {editedItemId === item._id ?
        (editImage ?
          <Image $isLoaded={editImage} src={editImage} alt="foto" />
          :
          item.image && <Image $isLoaded={item.image} src={`${API_URL}/Images/` + item.image} alt="foto" />)
        :
        item.image && <Image $isLoaded={isLoaded} onLoad={() => setIsLoaded(true)} src={`${API_URL}/Images/` + item.image} alt="foto" />}
    </ImageContainer>
  )
};

export default ImageItem;