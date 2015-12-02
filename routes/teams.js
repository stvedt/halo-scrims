var express = require('express');
var router = express.Router();

var dataEnvyUs = {
  name: "EnVyUs",
  players: ['Mikwen','APG','Heinz','Pistola']
};


var TeamSchema = require('../schemas/teams');

var record = new TeamSchema(dataEnvyUs);


router.get('/', function(req, res, next){

    res.render('default', {
        pageTitle: 'Teams ',
        className: 'teams'
    });
});

router.use('/set',function(req, res, next){
    record.save(function(err){
      if(err){
        console.log(err);
        res.status(500).json({status:'failure'});
      } else {
        console.log('success');
        res.json({status:'success'});
      }

    });
});

router.use('/get',  function(req, res, next){

    TeamSchema.find().exec(function(err, teams){
        if(err){
            console.log(err);
            res.status(500).json({status:'failure'});
        } else {
            console.log('success');
            res.json(teams);
          }
    });
});

router.get('/:teamName?',  function(req, res, next){
    var name = req.params.name;

    res.render('default', {
        pageTitle: 'Team: ' + req.params.teamName,
        className: 'team-single',
        players: null
    });
});

module.exports = router;