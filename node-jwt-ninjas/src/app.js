const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require("mongoose");
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// database connection
const dbURI = `mongodb+srv://sam:${process.env.PASS_MONGO_DB}@cluster0.khpxa.mongodb.net/node-auth`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

app.get('/set-cookies', (req, res) => {
    
    // use cookie-parser as a Middleware
    res.cookie("newUser", false);
    res.cookie("isEmployee", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send("Your cookies is created")
})

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);

    res.json(cookies)
})

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
