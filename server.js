const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbUrl = "mongodb://localhost:27017/notescollection";

const app = express();

const port = 3342;


app.use(bodyParser.urlencoded({extended: true}));

mongoClient.connect(dbUrl, function(err, db) {
    if(err) throw err;
    console.log("Database connection opened.");
    require('./api/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});