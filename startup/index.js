const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
var path = require('path');

// custom req
const CONFIG = require('../config/v1/config');

module.exports = function (app) {
    console.log('loading startup files');
    app.use(helmet({
        crossOriginResourcePolicy: false
    }));

app.use(express.static(path.join(__dirname, 'public')));

    app.set('view engine', 'ejs');
    app.use(
        helmet.contentSecurityPolicy({
          useDefaults: true,
          directives: {
            "img-src": ["'self'", "https: data:"],
            "defaultSrc": ["'self'"],
            "scriptSrc": ["*"],
            "script-src-attr":["'unsafe-inline'", "'self'"]
            // "styleSrc": ["'self'"],
            //'style-src': ["*", "'unsafe-inline'"]
          }
        })
      )

    // Define the static file path
    app.use('/uploads', express.static('uploads'));
    app.use('/public', express.static('public'));

   
    // dev environment configurations
    if (CONFIG.env === 'dev' || CONFIG.env === 'development') {
        app.use(morgan('tiny'));

        console.log('approved domains for development: ', CONFIG.cors_whitelist);
        console.log('development mode active....');
    }

    app.use(cors({ origin: CONFIG.cors_whitelist }))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}