const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Visit = require('./models/Visit');
const adminCheck = require('./adminCheck');
const jwtSecret = process.env.JWT_SECRET;

const handler = async (event) => {
  await adminCheck();

  const { username, password } = JSON.parse(event.body);

  if (!(username && password)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "WPROWADŹ LOGIN I HASŁO" }),
    };
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "UŻYTKOWNIK NIE ZOSTAŁ ZNALEZIONY" }),
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "LOGIN LUB HASŁO NIEPOPRAWNE" }),
      };
    }

    const token = jwt.sign({ username, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '30m' });

    const visitCount = await Visit.countDocuments();
    if (visitCount === null) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "BŁĄD PODCZAS POBIERANIA LICZBY ODWIEDZIN" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ token, visitCount }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Błąd serwera" }),
    };
  }
};

module.exports = { handler }