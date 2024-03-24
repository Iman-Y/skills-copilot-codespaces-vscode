// Create web server
// npm install express
// npm install body-parser
// npm install mongoose

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comments = require('./model/comments');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Get comments
app.get('/comments', function(req, res) {
    Comments.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

// Add comments
app.post('/comments', function(req, res) {
    var comments = new Comments();
    comments.author = req.body.author;
    comments.text = req.body.text;

    comments.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.send({message: 'Comment Added'});
    });
});

// Delete comments
app.delete('/comments/:id', function(req, res) {
    Comments.remove({
        _id: req.params.id
    }, function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.send({message: 'Comment Deleted'});
    });
});

// Update comments
app.put('/comments/:id', function(req, res) {
    Comments.findById(req.params.id, function(err, comments) {
        if (err) {
            res.send(err);
        }
        comments.author = req.body.author;
        comments.text = req.body.text;

        comments.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Comment Updated'});
        });
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
