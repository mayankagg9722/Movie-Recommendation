var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', data: null });
});



router.post("/movie", (req, res) => {
  var movie = req.body.movie;
  PythonShell.run('./draft.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution 
    console.log(results);
    res.status(200).json({
      data: results
    })
    //res.render('index', { title: 'Express', data: results });
  })
})

module.exports = router;
