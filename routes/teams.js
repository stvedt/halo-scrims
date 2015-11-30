var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

    res.render('default', {
        pageTitle: 'Teams ',
        className: 'teams'
    });
});

router.get('/:teamName?',  function(req, res, next){
    var name = req.params.name;

    res.render('default', {
        pageTitle: 'Team: ' + req.params.teamName,
        className: 'team-single'
    });
});

module.exports = router;