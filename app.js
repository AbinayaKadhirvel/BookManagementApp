var express = require('express');

// To create an instance of express
var app = express();

var port = 5000;

app.listen(port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Running server on port: ' + port);
    }
});