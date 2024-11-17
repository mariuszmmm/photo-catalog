const Item = require('./models/Item');
const cloudinary = require('./config/cloudinaryConfig');

const handler = async (event) => {
  if (event.httpMethod !== 'PUT') {
    console.error("Method Not Allowed. Please use PUT method.");
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  };

  try {
    const { id } = JSON.parse(event.body);

    const item = await Item.findOne({ _id: id });
    if (!item) {
      console.error("Element not found");
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Element nie został znaleziony" }),
      };
    };

    if (item.image) {
      const destroyResult = await cloudinary.uploader.destroy(item.image);
      if (destroyResult.result === 'not found') {
        console.error("No image found to delete");
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Brak obrazu do usunięcia" }),
        };
      } else if (destroyResult.result !== 'ok') {
        console.error("Error while deleting image: ", destroyResult);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Błąd przy usuwaniu obrazu" }),
        };
      };
    };

    item.image = null;
    item.url = null;
    item.downloadUrl = null;
    await item.save();

    console.log("Image successfully deleted");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Obraz pomyślnie usunięty" }),
    };

  } catch (error) {
    console.error("Error while deleting image: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Błąd przy usuwaniu obrazu" }),
    };
  };
};

module.exports = { handler };