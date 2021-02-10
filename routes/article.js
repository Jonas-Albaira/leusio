var express = require('express');
var router = express.Router();
var Prismic = require('prismic-javascript');
var PrismicConfig = require('./prismic-configuration');
var apiEndpoint = 'https://pointsandpixelsblog.prismic.io/api/v2';
var PrismicDOM = require('prismic-dom');



router.get('/', function(req, res) {
  
return req.params.uid.then(result => {
  console.log("sadashdasdas");
  

  function initApi(req) {
    return Prismic.getApi(apiEndpoint, {
      req: req
    });
  }

    res.locals.ctx = {
      endpoint: PrismicConfig.apiEndpoint,
      linkResolver: PrismicConfig.linkResolver,
    };
    // add PrismicDOM in locals to access them in templates.
    res.locals.PrismicDOM = PrismicDOM;
    //console.log(req.query.uid);

  initApi(req).then(function(api) {
      api.query([
        Prismic.Predicates.at('my.page.uid',result)     
      ]).then(function(response) {
        // response is the response object. Render your views here.
        res.render('article', {page:'Article', menuId:'article', document: response.results[0], document2: response.results }); //render blog posts
      
      });
    
    }); 
    
    
   
}).catch((error) => {
  console.log('error', error);
});


});


module.exports = router;
