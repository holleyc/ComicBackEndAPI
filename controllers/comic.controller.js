const Comic = require('../models/comic.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
   res.send('Greetings from the Test controller!');
};

// controllers/comics.js
exports.comic_create = function (req, res) {
    let comic = new Comic(
        {
            name: req.body.name,
	    publisher: req.body.publisher,
            issue: req.body.issue
        }
    );

    comic.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Comic Created successfully')
    })
};