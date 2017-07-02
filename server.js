var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var Burger = require("./models")["Burger"]
Burger.sync(); // creates a characters table

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// static directory
app.use(express.static('./public'));

var exphbs = require('express-handlebars');

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})
