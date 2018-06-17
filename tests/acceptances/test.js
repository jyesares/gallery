/* globals describe, it */
'use strict';

const should = require('chai').should();
const request = require('supertest');

const app = require('../../server/server');

const agent = request.agent(app);

describe('GET /api/photos/getrecents', () => {
  it('should return an object with options and array of photos', done => {
    agent.get('/api/photos/getrecents').end((err, res) => {
      res.statusCode.should.be.equal(200);
      res.headers['content-type'].should.match(/json/);
      res.body.should.have.property('photos');
      res.body.photos.should.have.property('page');
      res.body.photos.should.have.property('pages');
      res.body.photos.should.have.property('perpage');
      res.body.photos.should.have.property('total');
      res.body.photos.should.have.property('photo');
      done();
    });
  });

  it('should return an object with options and array of photos, and only 5 photos', done => {
    agent.get('/api/photos/getrecents?per_page=5').end((err, res) => {
      res.statusCode.should.be.equal(200);
      res.headers['content-type'].should.match(/json/);
      res.body.should.have.property('photos');
      res.body.photos.should.have.property('page');
      res.body.photos.should.have.property('pages');
      res.body.photos.should.have.property('perpage');
      res.body.photos.perpage.should.be.equal(5);
      res.body.photos.should.have.property('total');
      res.body.photos.should.have.property('photo');
      res.body.photos.photo.should.be.an.instanceOf(Array);
      res.body.photos.photo.should.have.lengthOf(5);
      done();
    });
  });

  it('should return an object with options and array of photos, each photo should container certain properties', done => {
    agent.get('/api/photos/getrecents?per_page=1').end((err, res) => {
      res.statusCode.should.be.equal(200);
      res.headers['content-type'].should.match(/json/);
      res.body.should.have.property('photos');
      res.body.photos.should.have.property('photo');
      res.body.photos.photo.should.be.an.instanceOf(Array);
      res.body.photos.photo.should.have.lengthOf(1);
      res.body.photos.photo[0].should.have.property('id');
      res.body.photos.photo[0].should.have.property('owner');
      res.body.photos.photo[0].should.have.property('secret');
      res.body.photos.photo[0].should.have.property('server');
      res.body.photos.photo[0].should.have.property('farm');
      res.body.photos.photo[0].should.have.property('title');
      res.body.photos.photo[0].should.have.property('ispublic');
      res.body.photos.photo[0].should.have.property('isfriend');
      res.body.photos.photo[0].should.have.property('isfamily');
      done();
    });
  });
});
