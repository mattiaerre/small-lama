module.exports.data = function (context, callback) {
  'use strict';
  var pkg = require('./package');
  var model = pkg;
  callback(null, model);
};