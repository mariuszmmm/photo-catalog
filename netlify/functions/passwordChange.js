const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    console.error("Method Not Allowed");
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Metoda nie jest dozwolona" })
    };
  }

  const { username, password, newPassword } = JSON.parse(event.body);
  if (!(password && newPassword)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Wprowadź stare i nowe hasło" }),
    }
  }

  const token = event.headers.authorization;
  if (!token) {
    console.error('No token');
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Brak tokenu" }),
    }
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.isAdmin) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "Zabroniona zmiana hasła administratora" }),
      }
    }
  } catch (err) {
    console.error('Błąd weryfikacji tokena:', err);
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Błąd weryfikacji tokena " }),
    };
  }

  const user = await User.findOne({ username });
  if (!user) {
    console.error('User not found');
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Brak użytkownika" }),
    };
  }

  try {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Hasło niepoprawne" }),
      };
    }
  } catch (err) {
    console.error('Error comparing passwords:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Błąd porównania hasła" }),
    };
  }

  try {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hasło zostało zmienione" }),
    };
  } catch (err) {
    console.error('Error changing password:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Błąd zmiany hasła" }),
    };
  }
};

module.exports = { handler };