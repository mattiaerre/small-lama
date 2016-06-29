var express = require('express');
var router = express.Router();
var Client = require('oc-client');

router.get('/', function (req, res, next) {
  var client = new Client({
    registries: { serverRendering: 'http://localhost:3000/' },
    components: {
      'oc-components-injector': '0.1.X',
      'oc-omg-exp-001': '0.1.X'
    }
  });

  var components = [
    {
      name: 'oc-components-injector',
      version: '0.1.X'
    },
    {
      name: 'oc-omg-exp-001',
      version: '0.1.X'
    }
  ];

  client.renderComponents(
    components,
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

      var injector = htmls.splice(0, 1);
      var experiments = htmls;
      var model = { title: 'small-lama/web-app', injector: injector, experiments: experiments };
      return res.render('index', model);
    });
});

module.exports = router;
