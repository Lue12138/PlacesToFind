const fs = require('fs');
const path = require('path');

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

// a special middleware
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// We're trying to send the request from localhost 3000 to localhost 8000. It's going to cause an CORS error in 
// our browser. CORS is a browser security concept: the server has to attach certain headers to the responses 
// it sends back to the client(frontend), in order to allow the client to access the resources. And then 
// the browser automatically detects the headers and says, OK, it's fine, you may access this.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

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
  // We can check if we do have a file if an error occurs. And if we do, we want to roll back 
  // because we had an error. We certainly don't want to keep it.
  if (req.file) {
    // delete that file
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  // check if the error response has been sent
  if (res.headerSent) {
    // has been sent so we're good!
    return next(error);
  }
  // 500 means internal server error in default
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
  // .connect('mongodb+srv://luxiaoh1:lxh201028@cluster0.gd9be.mongodb.net/mern?retryWrites=true&w=majority')
  .connect('mongodb+srv://luxiaoh1:lxh201028@ptf-dev-cluster.obc8olz.mongodb.net/?retryWrites=true&w=majority&appName=PTF-dev-cluster')
  .then(() => {
    // if the mongo connection is successful, start our server
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
