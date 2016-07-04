var Client = require('oc-client');

module.exports.data = function (context, callback) {
  'use strict';
  var pkg = require('./package');
  var model = pkg;

  var client = new Client({
    registries: { serverRendering: 'http://localhost:3000/' }
  });

  client.renderComponents(
    require('./components'),
    {
      container: false,
      headers: {
        'accept-language': 'en-GB'
      },
      timeout: 3.0
    }, function (errors, htmls) {
      if (errors)
        console.log('errors:', errors);
      console.log('htmls:', htmls);
      console.log('htmls.length:', htmls.length);


      var experiments = htmls;
      model.experiments = htmls;

      callback(null, model);
    });
};