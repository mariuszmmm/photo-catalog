const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const { username, password, newPassword } = JSON.parse(event.body);

  if (!(password && newPassword)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "WPROWADŹ HASŁA" }),
    }
  }

  const token = event.headers.authorization;
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "BRAK TOKENU" }),
    }
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.isAdmin) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "ZABRONIONA ZMIANA HASŁA ADMINISTORA" }),
      }
    }
  } catch (err) {
    console.error('Błąd weryfikacji tokena:', err);
    return
  }

  const user = await User.findOne({ username });
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "BRAK UŻYTKOWNIKA" }),
    };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "HASŁO NIEPOPRAWNE" }),
    };
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "HASŁO ZMIENIONO POMYŚLNIE" }),
  };
};

module.exports = { handler };