const express = require('express');
const mainRoutes = require('./server/routes/main');
const AdminRoutes = require('./server/routes/adminRoute');
const app = express();
const port = 8080;
const expressHandlebars = require('express-handlebars')
const session = require('express-session');
const { MemoryStore } = require('express-session');
const cors = require("cors");
require("dotenv").config();
// Call express Session Api.

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

//session

app.use(session({
    key: "user",
    secret: "thisisasecretsessiontoken",
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore(),
    cookie: {
        maxAge: 60000 // 1min
    }
}));

//Connect to Database
require('./server/database/database')();

//Setting up Routes
app.use('/', mainRoutes);

app.use('/admin', AdminRoutes);

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.render('500')
})
app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}.`);
});