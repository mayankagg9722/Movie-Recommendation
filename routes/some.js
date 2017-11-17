// // var PythonShell = require('python-shell')

// // var options = {
// // 		args: ["Star Wars (1997)"]
// // 	};


  
// // PythonShell.run('./script.py', options, function (err, results) {
  
// //   if(err){
// //     console.log(err)
// //   }else{
// //     console.log(results)
// //   }
// //   //   if (err) throw err;
// //   //   // results is an array consisting of messages collected during execution 
    
// //   //   console.log(JSON.parse(JSON.stringify(results[0])));
// //   })

// // var spawn = require("child_process").spawn;
// // var process = spawn('python',["script.py","Star Wars (1977)"]);

// // process.stdout.on('data',function(chunk){

// //     var textChunk = chunk.toString('utf8');// buffer to string

// //     data={}
// //     console.log(textChunk)
// // });

// var data= "{'rating': [4.3595890410958908, 4.2065217391304346, 4.0078895463510849, 4.2523809523809524, 3.2461538461538462], 'title': ['Star Wars (1977)', 'Empire Strikes Back, The (1980)', 'Return of the Jedi (1983)', 'Raiders of the Lost Ark (1981)', 'Austin Powers: International Man of Mystery (1997)']}"

// console.log(JSON.parse(data.replace(/'/g, '"')));