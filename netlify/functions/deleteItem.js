const Item = require("./models/Item");
const cloudinary = require('./config/cloudinaryConfig');

const handler = async (event) => {
  try {
    if (event.httpMethod !== 'DELETE') {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
    };

    const { id } = JSON.parse(event.body);
    const item = await Item.findOne({ _id: id });

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Element nie został znaleziony' }),
      };
    };

    if (item.image) {
      const destroyResult = await cloudinary.uploader.destroy(item.image);
      if (destroyResult.result === 'not found') {
        console.error("Brak obrazu do usunięcia");
      };
    };

    const result = await Item.deleteOne({ _id: id })

    if (result.deletedCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Element nie został znaleziony' }),
      };
    };

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Element został pomyślnie usunięty' }),
    };

  } catch (error) {
    console.error("Błąd przy usuwaniu elementu: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Błąd w usuwaniu elementu' }),
    };
  };
};

module.exports = { handler };