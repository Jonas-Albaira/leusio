var express = require('express');
var router = express.Router();
var Prismic = require('prismic-javascript');
var PrismicConfig = require('./prismic-configuration');
var apiEndpoint = 'https://pointsandpixelsblog.prismic.io/api/v2';
var PrismicDOM = require('prismic-dom');

	

	
function initApi(req) {
  return Prismic.getApi(apiEndpoint, {
    req: req
  });
}

router.get('/', function(req, res, next) {
      res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
    
initApi(req).then(function(api) {
    api.query(
      Prismic.Predicates.at('document.type', 'page')
    ).then(function(response) {
      // response is the response object. Render your views here.
      res.render('blog', {page:'Blog', menuId:'blog', document: response.results });
    });
  }); 
    

   
});
//////////

//////////////
module.exports = router;
