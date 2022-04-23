// this file is all about routes
const express = require("express");
// npm install --save express-validator
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");

// this is a special object on which we can also register middleware
// filttered by http method and path
const router = express.Router();

// '/:pid' is the path we want to filter, and a function executed when we get a GET request to '/:pid'
// note that '/:pid' is the path after initial filter(in our case 'api/places')
router.get("/:pid", placesControllers.getPlaceById);

// order here matters! note that user could be recognized as a pid!
router.get("/user/:uid", placesControllers.getPlacesByUserId);

// multiple middleware here, check is validator for request body
router.post(
  "/",
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
