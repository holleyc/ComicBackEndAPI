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

// This is the get all comics
router.get('/getallcomics', comic_controller.comic_list);

// This is the update comic put
router.put('/:id/update', comic_controller.comic_update);

// This is delete comic
router.delete('/:id/delete', comic_controller.comic_delete);





/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});
