const User = require('./models/User')

const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const users = await User.find()

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.toString() }),
    }
  }
}

module.exports = { handler };