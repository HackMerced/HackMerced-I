// const CronJob = require('cron').CronJob;
const fs = require('fs');
const moment = require('moment');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var _ = require('../../api/tools/utilities.js');
var $ = require('../../api/tools/nifty.js');

module.exports = function(app) {


  app.get('/', function(req, res){
    res.render('home/index');
  });

  // app.get('/weather', function(req, res){
  //     fs.readFile('assets/api-data/mercedWeather.json', "utf-8", function(e, o) {
  //       if (e) throw e;
  //
  //       res.send((o));
  //     });
  //
  // });

  //
  // var getMercedWeather = new CronJob({
  //   cronTime: '*/10 * * * *',
  //   onTick: function() {
  //     /* Runs every 2 minutes */
  //     console.log("running twitter job");
  //       var url = "http://api.openweathermap.org/data/2.5/weather?id=5372253&APPID=063214d3d0b60ee613a3a75918f472c0"
  //       $.request("http", url, "GET", {}, function(o){
  //         var write = JSON.stringify(o);
  //         fs.writeFile('assets/api-data/mercedWeather.json', write, function(err) {
  //             if (err) throw err;
  //             console.log('It\'s saved!');
  //           });
  //       }, function(){
  //         console.log("err")
  //       })
  //
  //   },
  //   start: true,
  //   timeZone: 'America/Los_Angeles'
  // });
  //
  // getMercedWeather.start();


}
