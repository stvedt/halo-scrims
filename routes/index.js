var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('default', {
        pageTitle: 'Home',
        className: 'home'
    });
});

router.get('/about', function(req, res){
    res.render('default', {
        pageTitle: 'About Halo Scrims',
        className: 'about'
    });
});

module.exports = router;
