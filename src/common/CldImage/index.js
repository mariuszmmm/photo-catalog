import { Cloudinary } from '@cloudinary/url-gen';
import { lazyload, responsive } from '@cloudinary/react';
import { ImageWarapper, StyledAdvancedImage } from './styled';

const CldImage = ({ public_id, showImage }) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const cld = new Cloudinary({ cloud: { cloudName } });

  const img = cld.image(public_id)
    .format('auto')
    .quality('auto')

  return (
    <ImageWarapper>
      <StyledAdvancedImage
        cldImg={img}
        plugins={[
          lazyload({ rootMargin: '150px' }),
          responsive({ steps: 20 })
        ]}
      />
    </ImageWarapper >
  );
};

export default CldImage