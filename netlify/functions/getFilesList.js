const cloudinary = require("./config/cloudinaryConfig");
const cloudName = process.env.CLOUDINARY_CLOUD_NAME

const handler = async (event) => {

  if (event.httpMethod !== 'GET') {
    console.error('Method Not Allowed');
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const folder = process.env.CLOUDINARY_FOLDER;

    const archiveResponse = cloudinary.utils.download_zip_url({
      resource_type: "image",
      type: "upload",
      target_format: "zip",
      prefixes: `${folder}/`,
      target_public_id: "images",
    });

    const response = await cloudinary.api.resources({
      type: 'upload',
      prefix: `${folder}/`
    });

    const images = response.resources.map((resource) => {
      return {
        name: `${resource.display_name}.${resource.format}`,
        public_id: resource.public_id,
        url: resource.url,
        downloadUrl: `http://res.cloudinary.com/${cloudName}/image/upload/fl_attachment/v${resource.version}/${resource.public_id}.${resource.format}`
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ images, zipUrl: archiveResponse }),
    }
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error); // console.error w języku angielskim
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.toString() }),
    }
  }
}

module.exports = { handler };