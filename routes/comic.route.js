const express = require('express');
const router = express.Router();

// Require the controllers
const comic_controller = require('../controllers/comic.controller');


// A simple test url to check that all of our files are communicating correctly as expected.
router.get('/test', comic_controller.test);
module.exports = router;