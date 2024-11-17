import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { lazyload, placeholder, responsive } from '@cloudinary/react';
import { StyledAdvancedImage } from './styled';

const CldImage = React.memo(({ public_id, alt }) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const cld = new Cloudinary({ cloud: { cloudName } });
  console.log("test")
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
          placeholder({ mode: 'blur' }),
          responsive({ steps: 20 })
        ]}
      />
    </div >
  )
});

export default CldImage