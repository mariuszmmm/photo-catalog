require('dotenv').config();
const Item = require("./models/Item");

const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
    }
    const data = JSON.parse(event.body);
    const itemData = {
      header: data.header,
      content: data.content,
      image: data.image,
      url: data.url,
      downloadUrl: data.downloadUrl,
    };

    const newItem = await Item.create(itemData);

    return {
      statusCode: 200,
      body: JSON.stringify(newItem),
    };
  } catch (error) {
    console.error("Błąd przy dodawaniu nowego elementu: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

module.exports = { handler };