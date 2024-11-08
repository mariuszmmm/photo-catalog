require('dotenv').config();
const mongoose = require("mongoose");
const Item = require("./models/Item");
const mongoDB = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(mongoDB);
  }
};

const handler = async (event) => {
  try {
    await connectDB();

    if (event.httpMethod !== 'PUT') {
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
      download: data.download,
    };

    const editedItem = await Item.findByIdAndUpdate(data.id, itemData, { new: true })

    return {
      statusCode: 200,
      body: JSON.stringify(editedItem),
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