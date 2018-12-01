const express = require('express');
const router = express.Router();

// Require the controllers
const comic_controller = require('../controllers/comic.controller');


// A simple test url to check that all of our files are communicating correctly as expected.
router.get('/test', comic_controller.test);
module.exports = router;

// routes/comics.route.js

// This is the create comic post
router.post('/create', comic_controller.comic_create);

// This is the read comic get
router.get('/:id', comic_controller.comic_details);