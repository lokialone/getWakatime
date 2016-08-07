const express = require('express');
const monk = require('monk');
const db = monk('localhost:27017/wakatime');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are connected");
});



module.exports = db;