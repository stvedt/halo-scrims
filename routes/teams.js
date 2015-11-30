var express = require('express');
var router = express.Router();

router.get('/teams/', function(req, res){
    var name = req.params.name;

    res.render('default', {
        pageTitle: 'Teams ',
        className: 'teams'
    });
});

router.get('/teams/:teamName?',  function(req, res){
    var name = req.params.name;

    res.render('default', {
        pageTitle: 'Team: ' + req.params.teamName,
        className: 'team-single'
    });
});

module.exports = router;