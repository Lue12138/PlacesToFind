// this file is all about routes
const express = require("express");
// npm install --save express-validator
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

// this is a special object on which we can also register middleware
// filttered by http method and path
const router = express.Router();

// '/:pid' is the path we want to filter, and a function executed when we get a GET request to '/:pid'
// note that '/:pid' is the path after initial filter(in our case 'api/places')
router.get("/:pid", placesControllers.getPlaceById);

// order here matters! note that user could be recognized as a pid!
router.get("/user/:uid", placesControllers.getPlacesByUserId);

// here we want to ensure that no unauthenticated users can post patch delete
// ie. here we check the token. this middleware here checks an incoming request for a valid token.
// And if the token is invalid, it will send back a response and it will block 
// the request from continuing its journey to the other routes.
router.use(checkAuth);

// multiple middleware here, check is validator for request body
router.post(
  "/",
  fileUpload.single('image'),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty()
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

// link this route to app.js since ultimately when we run npm start we will execute app.js file
module.exports = router;
