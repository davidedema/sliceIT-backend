const request = require('supertest');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
import app from '../app.js';
import mongoose from 'mongoose';

test('app module should be defined', async () => {
  await expect(app).toBeDefined();
});

test('GET / should return 404', () => {
  return request(app)
    .get('/')
    .expect(404); 
});