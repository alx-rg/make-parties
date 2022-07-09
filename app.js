const express = require('express')
const app = express()
// require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const models = require('./db/models');

// Use "main" as our default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Tell our app to send the "hello world" message to our home page
app.get('/', (req, res) => {
    // res.render('home', { msg: 'Handlebars are Cool!' });
    res.render('events-index', { events: events });
})
// Routes

// OUR MOCK ARRAY OF PROJECTS
var events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

// Tell our app to send the "hello world" message to our home page
app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
        res.render('events-index', { events: events });
      })
})

// INDEX
app.get('/events', (req, res) => {
    res.render('events-index', { events: events });
    // res.render('events-index', { events: events });
    console.log(req.body);
})
app.get('/events/new', (req, res) => {
    res.render('events-new', {});
})

// CREATE
app.post('/events', (req, res) => {
    models.Event.create(req.body).then(event => {
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err)
    });
  })

// Choose a port to listen on
const port = process.env.PORT || 3000;


// node app.js
// nodemon app.js
// view @ http://localhost:3000