const express = require('express')
const methodOverride = require('method-override')

const app = express()

// require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

const models = require('./db/models');

require('./controllers/events')(app, models);

// Use "main" as our default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');


// Choose a port to listen on
const port = process.env.PORT || 3000;


// node app.js
// nodemon app.js
// view @ http://localhost:3000