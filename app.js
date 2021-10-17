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

app.use(flash());
//tego nie rozumiem bo body-parse jest zdeprecjonowane i sie tu skreśla
//a bez tego routy nie działają


//Import Routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/users/', authRoute );


app.use(express.urlencoded({ extended: true }))

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.get('/api/movies/:id', (req,res)=>{
    const movie= movies.find(c => c.id === parseInt(req.params.id));
    if(!movie) res.status(404)
    .send('The movie with the given ID was not found');//404

    res.send(movie);
});



app.get('/api/user', (req, res) => {
   // res.json(users);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () =>  console.log(`boking on ${port}`));