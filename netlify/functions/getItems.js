require('dotenv').config();
const cloudinary = require("./config/cloudinaryConfig");
const Item = require("./models/Item");
const Visit = require("./models/Visit");
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudFolder = process.env.CLOUDINARY_FOLDER;

const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const resources = await cloudinary.api.resources_by_asset_folder(cloudFolder, {
      tags: true,
      metadata: true,
      context: true,
      upload_preset: "PhotoCatalog"
    });

    const CloudinaryUrls = {};
    resources.resources.forEach((resource) => {
      CloudinaryUrls[resource.public_id] =
        `http://res.cloudinary.com/${cloudName}/image/upload/fl_attachment/v${resource.version}/${resource.public_id}.${resource.format}`;
    });

    const ipAddress = event.headers['x-forwarded-for'];
    await Visit.create({ ipAddress: ipAddress })
      .then(() => console.log('Adres IP zapisany pomyślnie.'))
      .catch(err => console.error('Błąd podczas zapisywania adresu IP:', err))

    const results = await Item.find()
    const items = results.map((item) => ({
      _id: item._id,
      header: item.header,
      content: item.content,
      image: item.image,
      url: item.url,
      downloadUrl: item.downloadUrl,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString()
    }
  }
}

module.exports = { handler }