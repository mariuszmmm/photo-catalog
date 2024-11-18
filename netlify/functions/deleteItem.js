const Item = require("./models/Item");
const cloudinary = require('./config/cloudinaryConfig');

const handler = async (event) => {
  try {
    if (event.httpMethod !== 'DELETE') {
      console.error("Method Not Allowed. Please use DELETE method.");
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
    };

    const { id } = JSON.parse(event.body);
    const item = await Item.findOne({ _id: id });

    if (!item) {
      console.error("Element not found");
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Element nie został znaleziony' }),
      };
    };

    if (item.image) {
      const destroyResult = await cloudinary.uploader.destroy(item.image);
      if (destroyResult.result === 'not found') {
        console.error("No image found to delete");
      } else if (destroyResult.result !== 'ok') {
        console.error("Error while itemDeleting image: ", destroyResult);
      };
    };

    const result = await Item.deleteOne({ _id: id })

    if (result.deletedCount === 0) {
      console.error("Failed to delete the item");
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Element nie został znaleziony' }),
      };
    };

    console.log("Element successfully deleted");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Element został pomyślnie usunięty' }),
    };

  } catch (error) {
    console.error("Error while itemDeleting the item: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Błąd w usuwaniu elementu' }),
    };
  };
};

module.exports = { handler };