const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error');

const app = express();

// this middleware parse the data body, here we parse for json data
app.use(bodyParser.json());

// app.use() registers a middleware, but it does not execute it right away
// the middleware will be executed when a request reaches it
// here the path filter is 'api/places' now express.js only forward request to 
// our places route middleware if the path starts with 'api/places'
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// this middleware will only runs if we didn't send a response before 
// since if we do send a response , we don't call next(), so here we 
// handle all request wiht not response before
app.use((req,res,next)=> {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// a special middleware function! an error handling function!
// this middleware will only be executed if an error is thrown in front of it
app.use((error, req, res, next) => {
  // check if the error response has been sent
  if (res.headerSent) {
    // has been sent so we're good!
    return next(error);
  }
  // 500 means internal server error in default
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
  .connect('mongodb+srv://luxiaoh1:lxh201028@cluster0.gd9be.mongodb.net/places?retryWrites=true&w=majority')
  .then(() => {
    // if the mongo connection is successful, start our server
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
