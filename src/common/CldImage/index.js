import { Cloudinary } from '@cloudinary/url-gen';
import { lazyload, placeholder, responsive } from '@cloudinary/react';
import { StyledAdvancedImage } from './styled';

const CldImage = ({ public_id, alt }) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const cld = new Cloudinary({ cloud: { cloudName } });

  const img = cld.image(public_id)
    .format('auto')
    .quality('auto')

  return (
    <div>
      <StyledAdvancedImage
        cldImg={img}
        alt={alt}
        plugins={[
          lazyload({ rootMargin: '200px' }),
          placeholder('grayscale'),
          responsive({ steps: 20 })
        ]}
      />
    </div >
  )
};

export default CldImage