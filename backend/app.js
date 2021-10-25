const Joi = require('joi'); //biblioteka do szybszej i łatwiejszej walidacji
const express = require('express'); //biblioteka np. do requestów http
const bcrypt = require('bcrypt'); // hashowanie haseł
const pool = require('./models/db');  //database                    //tu nie działa ale ogolnie moze zadziała https://youtu.be/vxu1RrR0vbw?t=3657
const session = require('express-session');
const flash = require('express-flash');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json()); // zeby apka akceptowala jsony
app.use(session({
    secret: 'secret', //encrypt information stored in a session
    resave: false, //should we resave session variables if nothing is changed
    saveUninitialized: false //do we wanna save session if there is no value placed in a session
}));

app.use(function(req, res, next) {  //cross origin resource sharing, pozwolenie na łączenie sie frontendu i backendu 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(flash());

//Import Routes
const authRoute = require('./routes/auth-route');
const videoRoute = require('./routes/stream-route');

//Route Middlewares
app.use('/api/users/', authRoute );
app.use('/api/movies/', videoRoute);

app.use(express.urlencoded({ extended: true }))



//PORT
const port = process.env.PORT || 5000;
app.listen(port, () =>  console.log(`boking on ${port}`));