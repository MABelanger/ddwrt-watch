var request = require('request');
var Parse = require('./parse');
var Speed = require('./speed');

var FETCH_URL='http://192.168.1.1/fetchif.cgi?vlan1';
var SPEED_UNITS = "kb/s";
var CREDENTIAL = {
  user: 'root',
  password: ''
};

function getSpeedKb(speed) {
  return Math.round(speed / 10.24)/100;
}

function writeStdout(speedIn, speedOut, units){
  var sin = speedIn + " " + units;
  var sout = speedOut + " " + units;
  var strOut = "IN :" + sin + " OUT : " + sout;
  process.stdout.write("  " + strOut + "                     " + '\r');
}

function recursiveLoop() {
  request(FETCH_URL, function(error, response, body) {
    var data = Parse.getData(body)
    var speed = Speed.getSpeed(data.ifin, data.ifout, data.ugmt);

    var speedIn = getSpeedKb(speed.in);
    var speedOut = getSpeedKb(speed.out);
    writeStdout(speedIn, speedOut, SPEED_UNITS);

  }).auth(CREDENTIAL.user, CREDENTIAL.password, false);

  // Each second do recursive fct call
  setTimeout(recursiveLoop, 1000);
}
recursiveLoop();