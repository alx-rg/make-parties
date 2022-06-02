const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Use "main" as our default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars are Cool'});
})

// OUR MOCK ARRAY OF PROJECTS
var events = [
  { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://source.unsplash.com/random" },
  { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://source.unsplash.com/random" },
  { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://source.unsplash.com/random" }
]

// INDEX
app.get('/events', (req, res) => {
  res.render('events-index', { events: events });
})

// port
const port = process.env.PORT || 3000;

// tell app the port
app.listen(port, () => {
  console.log('App listeinig on port 3000!')
})