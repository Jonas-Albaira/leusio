var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var https = require('https');
var fs = require('fs');
var PrismicConfig = require('./prismic-configuration');
var Prismic = require('prismic-javascript');
var PrismicDOM = require('prismic-dom');

var router = express.Router();

env = process.env.NODE_ENV || 'development';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var workRouter = require('./routes/work');
var articleRouter = require('./routes/article');
var fullStackRouter = require('./routes/yeahdatsme');

var favicon = require('serve-favicon');



const app = express();

var apiEndpoint = 'http://pointsandpixelsblog.prismic.io/api/v2';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.listen(80);



var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(process.env.PORT || 3000);



app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/work', workRouter);

app.use('/work/:pid', fullStackRouter);

app.use('/article/:uid', function(req, res) {
  
  var articleID = req.params.uid
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
          Prismic.Predicates.at('my.page.uid',articleID)     
        ]).then(function(response) {
          // response is the response object. Render your views here.
          res.render('article', {page:'Article', menuId:'article', document: response.results[0], document2: response.results }); //render blog posts
        
        });
      
      }); 
      
      
     
  
  
  });
  
  
  module.exports = router;


// Middleware to inject prismic context
app.use(function(req, res, next) {
 res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});


	
var Prismic = require('prismic-javascript');
 
// Initialize the prismic.io api
function initApi(req) {
  return Prismic.getApi(apiEndpoint, {
    req: req
  });
}


module.exports = app;

