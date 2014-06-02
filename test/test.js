var should = require('chai').should(),
  request = require('supertest'),
  app = 'http://localhost:5000',
  fs = require('fs')

// http://codereview.stackexchange.com/questions/26259/populating-an-unordered-list-from-values-in-a-json-file

var readJSONFile = function(filename, callback) {
  require("fs").readFile(filename, function(err, data) {
    if (err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch (exception) {
      callback(exception);
    }
  });
}

describe('General Testing', function() {

  it('GET / responds with json', function(done) {
    request(app).get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('POST / responds with json', function(done) {
    request(app).post('/')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});

describe('API Testing', function() {

  it('Returns blog posts as JSON', function(done) {
    readJSONFile("test/req.json", function(err, json) {
      if (err) {
        throw err;
      }
      request(app).post('/')
        .send(json)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.have.property('response').and.be.instanceof(Array);
          done();
        });
    });
  });

  it('Returns an error for bad JSON', function(done) {
      request(app).post('/')
        .send('DUMMY')
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.have.property('error');
          done();
        });
    });
});