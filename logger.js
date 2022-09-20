var Logger = (exports.Logger = {});
var fs = require("fs");
var errorStream = fs.createWriteStream("error.log" , {flags : 'a'});
Logger.error = function (msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  errorStream.write(message);
};

module.exports = Logger
// Logger.error("Hello");