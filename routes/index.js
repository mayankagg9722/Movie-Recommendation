var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell')
var User = require("../models/schema");
var request = require('request');
var cheerio = require('cheerio');
var Q=require('q')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', search: "Search Movie" });
});



router.post("/movie", (req, res) => {
  var movie = req.body.movie;
  var query_url="http://www.imdb.com/find?q="+req.query.title+"+"+req.query.year+"&s=all";
  var getURL= function(the_url) {
    
        var some_imdb_url;
    
        // Q.defer makes this synchronous.  It's needed since the URL is 
        // required before we can send it to the parser function below.
        var deferred = Q.defer();
    
        request( the_url, function(error, response, html){
          if(!error){
            var $ = cheerio.load(html);
            var href=$(".findList").find("tr").first().find("a").attr('href');
            some_imdb_url= "http://www.imdb.com"+href;
            console.log(some_imdb_url);
            
            deferred.resolve(some_imdb_url);
          }
        });
    
        return deferred.promise;
      };

  var flag=0
  var textChunk=""
  
  var spawn = require("child_process").spawn;
  var process = spawn('python',["script.py",movie]);
  process.stdout.on('data',function(chunk){
    textChunk = chunk.toString('utf-8')// buffer to string
    var data=textChunk.toString()
    console.log(typeof(data))
    res.send(JSON.parse(data.replace(/'/g, '"').replace(/"s/g, "'s")))
  });
})





router.get('/scrape', function(req, res){
  
    // var query_url="http://www.imdb.com/find?q="+"matrix+1999"+"&s=all";
    var query_url="http://www.imdb.com/find?q="+req.query.title+"+"+req.query.year+"&s=all";
    // var query_url="http://www.imdb.com/find?q=The Shawshank Redemption&year=1994";
  
    console.log(query_url);
  
    // searches imdb and gets the first result, which is probably correct
    // takes: a URL in the format, ex: http://www.imdb.com/find?q=matrix+1999&s=all
    // returns: the movie's URL,  ex: http://www.imdb.com/title/tt0133093/?ref_=fn_al_tt_1
    var getURL= function(the_url) {
  
      var some_imdb_url;
  
      // Q.defer makes this synchronous.  It's needed since the URL is 
      // required before we can send it to the parser function below.
      var deferred = Q.defer();
  
      request( the_url, function(error, response, html){
        if(!error){
          var $ = cheerio.load(html);
          var href=$(".findList").find("tr").first().find("a").attr('href');
          some_imdb_url= "http://www.imdb.com"+href;
          console.log(some_imdb_url);
          
          deferred.resolve(some_imdb_url);
        }
      });
  
      return deferred.promise;
    };
  
    
    // takes: the movie's URL, ex: http://www.imdb.com/title/tt0133093/?ref_=fn_al_tt_1
    // returns a JSON object with:
    //    Title, Year, imdbRating, Director, Actors, Plot, Poster (image url),
    //	  Metacritic Metascore, imdbVotes, imdbID
    var get_movie_json= function( the_url) {
  
      request(the_url, function(error, response, html){
        if(!error){
          var $ = cheerio.load(html);
          // console.log(html);
          console.log($(".poster").find("img").attr('src'))
          // var json = { Title : "", Year : "", imdbRating:"", Director:"", Actors:"", Plot:"", Poster:"", Metascore:"", imdbVotes:"", imdbID:""};
  
          // json.Title = $('.header').find("span[itemprop='name']").text();
          // json.Year = $('.header').find("span[class='nobr']").find("a").text();
          // json.imdbRating=$('.star-box-details').find("span[itemprop='ratingValue']").text();
  
          // $("div[itemprop='director']").find("span[itemprop='name']").each( function (index, element) {
          //   var director=$(element).eq(0).text();
          //   json.Director+=director+", ";
          // });
          // // get rid of the last ', '
          // json.Director=json.Director.replace(/,\W+$/,"");
  
          
          // $("div[itemprop='actors']").find("span[itemprop='name']").each( function() {
          //   var star=$(this).eq(0).text();
          //   json.Actors+=star+", ";
          // });
          // // get rid of the last ', '
          // json.Actors=json.Actors.replace(/,\W+$/,"");
          
          // json.Plot=$("p[itemprop='description']").text().trim();
          // json.Poster=$(".image").find("img").attr("src");
  
  
          // var metascore =$("a[href='criticreviews?ref_=tt_ov_rt']").text().trim();
          // var metascorePattern = /^\d+/;
          // var metascore_res = metascorePattern.exec(metascore);
          
          // if (metascore_res) {
          //   json.Metascore=metascore_res[0];	
          // }
  
          // json.imdbVotes=$('.star-box-details').find("span[itemprop='ratingCount']").text();
          
          // var imdbPattern= /tt\d+/;
          // var imdbRes=imdbPattern.exec(the_url);
  
          // json.imdbID=imdbRes[0];
          
        };
            
          res.send($(".poster").find("img").attr('src'));
  
      });
  
    };
  
    // first get the url, then send the url to the parser
    getURL(query_url).then( function (some_url){
  
      get_movie_json(some_url);
  
    });
  
  });
  




// router.post("/add/rating", (req, res) => {
//   var mName = req.body.mName;
//   var uid = parseInt(req.body.uid);
//   var rating = parseFloat(req.body.rating);
//   User.create({ uid: uid, mName: mName, rating: rating }, (err, data) => {

//   })
// })

module.exports = router;
