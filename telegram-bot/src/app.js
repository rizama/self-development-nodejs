const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

// basic commands
// require("./bots/basicBot");

// Echo Bot (Logging)
// require("./bots/echoBot");

// Media Bot
// require("./bots/mediaBot");

// API Bot
// require("./bots/ApiBot");

// API Bot
// require("./bots/factsBot");

// Crypto Bot
// require("./bots/cryptoBot");

// Chanel Bot
// require("./bots/channelFeedBot");

// Chanel Bot
require("./bots/botWithMysql");

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Simple API Starter'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
