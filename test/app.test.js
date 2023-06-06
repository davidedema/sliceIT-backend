import request from 'supertest';
import app from '../app.js';

test('app module should be defined', () => {
  expect(app).toBeDefined();
});

test('GET / should return 404', () => {
  return request(app)
    .get('/')
    .expect(404);
});