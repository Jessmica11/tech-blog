// require packages
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const { sequelize } = require('./routes');

// Load environment variables from .env file
dotenv.config();

// PORT & app information
const app = express();
const PORT = process.env.PORT || 3000;

// middleware for json, session
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set-up and link a session object with the sequelize store
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}));

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// routes
const routes = require('./routes');
app.use(routes);

// sequelize to database and run at PORT
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});