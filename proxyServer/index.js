var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var base64Img = require('base64-img');
var fsExtra = require('fs-extra');
var jsonxml = require('jsontoxml');
var writeFile = require('write-file');
var request = require("request");
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));


app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000
}));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Credentials', '*');
    next();
});


app.get('/city/:city', function (req, res) {
    console.log("city>>>>>>>" + JSON.stringify(req.body));
  
    var options = {
        method: 'GET',
        url: `https://www.metaweather.com/api/location/search/?query=${req.params.city}`,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send(response.body);
    });

})
app.get('/woeid/:woeid', function (req, res) {
    console.log("woeid>>>>>>>" + JSON.stringify(req.body));
  
    var options = {
        method: 'GET',
        url: `https://www.metaweather.com/api/location/${req.params.woeid}/`,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send(response.body);
    });

})


var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server Started at http://%s:%s", host, port)

});






