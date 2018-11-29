const express = require('express');
const router = express.Router();

// Require the controllers
const product_controller = require('../controllers/product.controller');


// A simple test url to check that all of our files are communicating correctly as expected.
router.get('/test', product_controller.test);
module.exports = router;