require('dotenv').config();
const express = require('express');
const db = require('./src/models');

const PORT = process.env.PORT || 3000;
db.sequelize.sync();

const app = express();

require('./src/utils/root')(app);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
