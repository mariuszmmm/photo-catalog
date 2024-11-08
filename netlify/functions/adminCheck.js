const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function adminCheck() {
  try {
    const admin = await User.findOne({ isAdmin: true });
    if (!admin) {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminUsername || !adminPassword) {
        throw new Error("Brak wymaganych danych środowiskowych dla administratora");
      }

      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newAdmin = new User({
        username: adminUsername,
        password: hashedPassword,
        isAdmin: true,
      });

      await newAdmin.save();
      console.log('Utworzono konto administratora');
    }
  } catch (err) {
    console.error('Błąd podczas sprawdzania lub tworzenia konta administratora:', err);
  }
}

module.exports = adminCheck;
