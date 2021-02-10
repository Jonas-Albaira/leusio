var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
  res.render('yeahdatsme', {page:'Full Stack Application', menuId:'yeahdatsme'});
});

module.exports = router;
