const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const jwtSecret = process.env.JWT_SECRET;

const handler = async (event) => {

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { username, password } = JSON.parse(event.body);

  if (!(username && password)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "WPROWADŹ LOGIN I HASŁO" }),
    };
  }

  const token = event.headers.authorization;
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'BRAK TOKENU' }),
    };
  }

  const decoded = jwt.verify(token, jwtSecret);
  if (!decoded.isAdmin) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'UŻYTKOWNIK NIE JEST ADMINSTRATOREM' }),
    };
  }

  const user = await User.findOne({ username });
  if (user) {
    return {
      statusCode: 409,
      body: JSON.stringify({ message: 'UŻYTKOWNIK ISTNIEJE' }),
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: false
    });
    await newUser.save();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'UŻYTKOWNIK ZOSTAŁ UWORZONY POMYŚLNIE' }),
    }
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Wewnętrzny błąd serwera' }),
    }
  }
}

module.exports = { handler };