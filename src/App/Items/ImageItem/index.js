import Image from "../../../common/Image";
import ImageContainer from "../../../common/ImageContainer";
import CldImage from "../../../common/CldImage";

const ImageItem = ({ item, editedItemId, editImage }) => (
  <ImageContainer>
    {editedItemId === item._id ?
      (editImage ?
        <Image src={editImage} alt="foto" />
        :
        item.image &&
        <CldImage public_id={item.image} alt="foto" />
      )
      :
      item.image &&
      <a href={item.url} target="_blank" rel="noreferrer">
        <CldImage public_id={item.image} alt="foto" />
      </a>}
  </ImageContainer>
);

export default ImageItem;