const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');
const app = express();
require('dotenv').config({ path: './con/config.env' });
// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// routers
app.use('/api/v1', require('./routers/routes'));

const PORT = process.env.PORT || 5000;
db.sequelize
  // .sync({ force: true })
  // .sync()
  .authenticate()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err.message);
  });
