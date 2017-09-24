var PythonShell = require('python-shell')

var options = {
		args: ["Dark Knight"]
	};


PythonShell.run('./draft.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution 
    
    console.log(JSON.parse(JSON.stringify(results[0])));
  })