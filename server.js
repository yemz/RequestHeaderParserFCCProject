//FreeCodeCamp - Back End Project - Request Header Parser 
//User Story: I can get the IP address, language and operating system for my browser.
//Output: https://dark-clover.glitch.me

var acceptLang = require('accept-language'); //for language
var useragent = require('useragent'); //for operating system
var express = require('express');
var ip = require('ip');

var app = express();
ip.address(); //access ip address

//initialize port values
var port = process.env.PORT || 8080;
 

//Get ip address from request connection
app.get('/', function(req, res, next){
   var ip = (req.header['x-forwarded-for'] || 
      req.headers['x-forwarded-for'].split(',')[0] || //if ip is returned in ::ffff:xxx.xxx.xxx.xxx format
      req.connection.remoteAccess ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress); 
      console.log(req.ip);
      console.log(ip + " this is ip");
      next();

//get language from browser
app.get('/', function (req, res, next) {
   var language = req.header('Accept-Language').split(',')[0]; //split is used to return only language and region ex.en-Us
      console.log(language);
      next();

//get operating system from browser
app.get('/', function (req, res) {
   var agent = useragent.parse(req.headers['user-agent']);
   var software = agent.os.family; // 'Mac OSX 10.8.1' 
      console.log(agent.os.family);


      //send response as JSON to display content in browser
      res.json({ipaddress: ip, language: language, software: software});

     }); //get operating system

  });// get language

}); //get ip

//listen to port
var listener = app.listen(process.env.PORT, function(){
   console.log("Listening on Port: " + listener.address().port); 
});
