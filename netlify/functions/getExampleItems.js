const cloudinary = require("./config/cloudinaryConfig");
const Item = require("./models/Item");
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudFolder = process.env.CLOUDINARY_FOLDER;
const cloudArchiveFolder = process.env.CLOUDINARY_ARCHIVE_FOLDER;

const handler = async () => {
  try {
    const resourcesFromArchive = await cloudinary.api.resources_by_asset_folder(cloudArchiveFolder);
    const preset = process.env.CLOUDINARY_UPLOAD_PRESET;

    for (const resource of resourcesFromArchive.resources) {
      try {
        await cloudinary.uploader.upload(resource.secure_url, {
          upload_preset: preset,
          folder: cloudFolder,
          context: `caption=${resource?.context?.custom?.caption || ''} | alt=${resource?.context?.custom?.alt || ''}`,
        });
      } catch (uploadError) {
        console.error("Error uploading resource to Cloudinary:", uploadError);
      }
    };

    const resources = await cloudinary.api.resources_by_asset_folder(cloudFolder);
    console.log("Fetching resources from folder:", cloudFolder);

    for (const resource of resources.resources) {
      const itemData = {
        header: resource.context?.custom?.caption || "Brak tytułu",
        content: resource.context?.custom?.alt || "Brak opisu",
        image: resource.public_id,
        url: resource.url,
        downloadUrl: `http://res.cloudinary.com/${cloudName}/image/upload/fl_attachment/v${resource.version}/${resource.public_id}.${resource.format}`
      };

      try {
        await Item.create(itemData);
        console.log(`Item created for resource: ${resource.public_id}`);
      } catch (itemCreationError) {
        console.error(`Error creating item for resource ${resource.public_id}:`, itemCreationError);
      }
    };

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Images copied' }),
    }

  } catch (error) {
    console.error("Error in 'copyExampleImages' function: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing images' }),
    };
  }
}

module.exports = { handler }