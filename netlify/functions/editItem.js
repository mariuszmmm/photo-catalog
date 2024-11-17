require('dotenv').config();
const Item = require("./models/Item");

const handler = async (event) => {
  try {
    if (event.httpMethod !== 'PUT') {
      console.error("Method Not Allowed. Please use PUT method.");
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

    const editedItem = await Item.findByIdAndUpdate(data.id, itemData, { new: true })

    console.log("Item successfully updated:", editedItem);
    return {
      statusCode: 200,
      body: JSON.stringify(editedItem),
    };
  } catch (error) {
    console.error("Error while updating the item: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

module.exports = { handler };