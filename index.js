var express         = require('express');
var bodyParser      = require('body-parser');
var _               = require('underscore');
var app             = express();

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
        result = _(data.payload).filter(function(el) { return el.drm === true });
        result = _(data.payload).filter(function(el) { return el.episodeCount > 0 });
        if (result) {
            return getFormattedResults(result)
        } else {
            return []
        }
    }
    return []
};


app.use(bodyParser());

app.use(function (error, req, res, next) {
    res.json(400, { error: 'Could not decode request: JSON parsing failed'})
})

app.get('/', function(req, res) {
    var result = getShows(req.body);
    res.json(200, { response: result } );
});

app.post('/', function(req, res) {

    var result = getShows(req.body);
    res.json(200, { response: result } );
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
    console.log('listening on ' + port);
});