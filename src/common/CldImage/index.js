import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { lazyload, responsive } from '@cloudinary/react';
import { StyledAdvancedImage } from './styled';
import { CLOUDINARY_CLOUD_NAME } from "../../api";

const CldImage = ({ public_id }) => {
  const cld = new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME } });
  const img = cld
    .image(public_id)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500))

  return (
    <StyledAdvancedImage
      cldImg={img}
      plugins={[
        lazyload({ rootMargin: '100px' }),
        responsive({ steps: 200 })
      ]}
    />);
};

export default CldImage