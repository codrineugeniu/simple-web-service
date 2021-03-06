var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var port = Number(process.env.PORT || 5000);

var getFormattedResults = function(data) {
    var result = [];
    _(data).each(function(el) {
        result.push({
            image: el.image.showImage,
            slug: el.slug,
            title: el.title
        });
    });
    return result
}

var getShows = function(data) {
    var result = [];
    if (data && data.payload) {
        result = _(data.payload).filter(function(el) {
            return el.drm === true
        });
        result = _(data.payload).filter(function(el) {
            return el.episodeCount > 0
        });
        if (result && result.length > 0) {
            return getFormattedResults(result)
        } else {
            return []
        }
    }
    return []
};

var handleRequest = function(req, res) {
    if (req.body && req.body.payload) {
        var result = getShows(req.body);
        res.json(200, {
            response: result
        });
    } else {
        res.json(400, {
            error: 'Could not decode request: JSON parsing failed'
        })
    }
}

app.use(bodyParser());

app.get('/', function(req, res) {
    return handleRequest(req,res)
});

app.post('/', function(req, res) {
    return handleRequest(req,res)
});

app.listen(port, function() {
    console.log('listening on ' + port);
});