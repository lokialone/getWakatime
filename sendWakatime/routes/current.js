var express = require('express');
var router = express.Router();

/* GET current time */
router.get('/', function(req, res, next) {
  var date = newDate();
  console.log(date);
  res.render('index',{title:'hello0-0'});
});

module.exports = router;
