require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        app.emit('Ready');
    })
    .catch((error) => {
        console.log(error);
    });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csurf = require('csurf');
const { mainMiddleware, checkCSRFError, CSRFMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionOptions = session({
    secret: process.env.MY_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * (60 * 60 * 24) * 7,
        httpOnly: true
    }
});


app.use(sessionOptions);
app.use(flash());
app.use(csurf());
app.use(CSRFMiddleware);
app.use(checkCSRFError);
app.use(mainMiddleware);
app.use(routes);

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('Ready', () => {
    app.listen(3000, () => {
        console.log('http://localhost:3000') ;
        console.log('Servidor executando na porta 3000');
    });
});
