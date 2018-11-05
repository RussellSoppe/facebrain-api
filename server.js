const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

//Endpoint Functions
const register = require('./controllers/register');
const image = require('./controllers/image');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
//Will need to setup process.env.CONSTANT_NAME for database password at a later date.

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    //need to create env variable for username
    user : DB_USER,
    //need to create env variable for password
    password : DB_PASSWORD,
    database : 'smart-brain'
  }
});

//notes: 127.0.0.1 is default for port and home so one could say, "There is no place like 127.0.0.1!"

db.select('*').from('users') //this returns a promise so we will need to use .then to go from here
	.then(data => {
		//console.log(data);
	}); //dont need json since we are not sending through HTTP
 

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send(database.users);})
app.post('/signin', (req, res) =>{signin.handleSignIn(req, res, db, bcrypt)})
app.post ('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})
// if we use /profile/:id we can then use request.params to grab any id in browser
app.get('/profile/:id', (req, res) =>{profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})


app.listen(3000)

