const Comic = require('../models/comic.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
   res.send('Greetings from the Test controller!');
};

// controllers/comics.js
// This will create a new item
exports.comic_create = function (req, res) {
    let comic = new Comic(
        {
            name:  req.body.name,
            publisher: req.body.publisher,
            issue: req.body.issue
        }
    );

    comic.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Comic Created successfully');
        console.log("Comic "+req.body.name+" added successfully!");
    })
};

// This will find the item by id
exports.comic_details = function (req, res) {
    Comic.findById(req.params.id, function (err, comic) {
        if (err) return next(err);
        res.send(comic);
    })
};

// This will update the comic
exports.comic_update = function (req, res) {
    Comic.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, comic) {
        if (err) return next(err);
        res.send('Comic udpated.');
    });
};

// This will delete a comic
exports.comic_delete = function (req, res) {
    Comic.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Comic deleted successfully!');
    })
};