const express       = require('express')
const path          = require('path');
const bodyparser    = require('body-parser');
const fs            = require('fs');
const showRoutes    = require('./routes').showRoutes
const routes        = require('./routes').getRoutes

//Set up the express app
const app           = express()
const PORT = process.env.PORT || 8080;

//set path for static files (css, images...)
app.use(express.static(path.join(__dirname, 'public')));

//parse request bodies (req.body / POST )
//extended : parse nested objects. ex: {person: {name:cw}}
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

var router = express.Router();

router.get('/', function (req, res){
  res.send({ 
    index: "hello API user !"
  })
});

var folderPath = `${__dirname}/mockedJson/`
for (var pathRoute in routes) {
  router.get(routes[pathRoute], function (req, res){
    res.header("Content-Type", 'application/json')
    let filePath = path.join(folderPath, `${pathRoute}.json`)
    res.sendFile(filePath)
  });
}

app.use('/', router);

app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

//app.set('view engine', 'ejs');
showRoutes()

// START THE SERVER
app.listen(PORT, ()=>{
  console.log(`Server started at the port: ${PORT}`);
});
