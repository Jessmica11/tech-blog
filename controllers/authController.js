const bcrypt = require('bcrypt');
const { User } = require('../../models');

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const userData = await User.create({ username, password: hashedPassword });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const userData = await User.findOne({ where: { username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Verify the password using bcrypt
    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const logout = (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
};

module.exports = { signup, login, logout };