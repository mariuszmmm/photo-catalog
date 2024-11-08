const Item = require('./models/Item');
const cloudinary = require('./config/cloudinaryConfig');

const handler = async (event) => {
  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  };

  try {
    const { id } = JSON.parse(event.body);

    const item = await Item.findOne({ _id: id });
    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Element nie został znaleziony" }),
      };
    };

    if (item.image) {
      const destroyResult = await cloudinary.uploader.destroy(item.image);
      if (destroyResult.result === 'not found') {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Brak obrazu do usunięcia" }),
        };
      } else if (destroyResult.result !== 'ok') {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Błąd przy usuwaniu obrazu" }),
        };
      };
    };

    item.image = null;
    await item.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Obraz pomyślnie usunięty" }),
    };

  } catch (error) {
    console.error("Błąd przy usuwaniu obrazu: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Błąd przy usuwaniu obrazu" }),
    };
  };
};

module.exports = { handler };