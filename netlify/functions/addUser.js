const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const jwtSecret = process.env.JWT_SECRET;

const handler = async (event) => {

  if (event.httpMethod !== 'POST') {
    console.error('HTTP method not allowed. Expected POST.');
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Metoda HTTP jest niedozwolona. Wymagane jest użycie metody POST.' }),
    };
  }

  const { username, password } = JSON.parse(event.body);
  if (!(username && password)) {
    console.error('Username or password is missing.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Wprowadź login i hasło.' }),
    };
  }

  const token = event.headers.authorization;
  if (!token) {
    console.error('Authorization token is missing.');
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Brak tokenu autoryzacji.' }),
    };
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded.isAdmin) {
      console.error('User is not an administrator.');
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Użytkownik nie jest administratorem.' }),
      };
    }
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Token autoryzacji jest nieprawidłowy lub wygasł.' }),
    };
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      console.error('User already exists.');
      return {
        statusCode: 409,
        body: JSON.stringify({ message: 'UŻYTKOWNIK ISTNIEJE' }),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: false
    });
    await newUser.save();

    console.log('User created successfully:', username);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Użytkownik został utworzony pomyślnie.' }),
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Wewnętrzny błąd serwera.' }),
    }
  }
}

module.exports = { handler };