const chai = require('chai');
const chaiHTTP = require('chai-http');
const path = require('path');
const fs = require('fs');
const jsonParser = require(path.join(__dirname, '..', 'lib', 'json_parser'));
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

describe('UNIT TEST: parser', () => {
  it('should parse well formed JSON', (done) => {
    var req = fs.createReadStream(path.join(__dirname, '..', 'lib', 'good.json'));
    jsonParser(req, null, function() {
      expect(req.body.hello).to.eql('world');
      done();
    });
  });
  it('should err if json is invalid', (done) => {
    var req = fs.createReadStream(path.join(__dirname, '..', 'lib', 'bad.json'));
    var res = {
      status: function(statusCode) {
        expect(statusCode).to.eql(400);
        return {
          json: function(obj) {
            expect(obj.msg).to.eql('invalid data sent');
            done();
          }
        };
      }
    };
    jsonParser(req, res);
  });
});

describe('INTEGRATION TEST: server', () => {
  it('should POST properly', (done) => {
    request('localhost:3000')
    .post('/')
    .send({hello: 'world'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('{"hello":"world"}');
      expect(res.body).to.eql({hello: 'world'});
      done();
    });
  });
});
