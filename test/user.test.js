const request = require('supertest');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
import app from '../app.js';
import mongoose from 'mongoose';


describe('GET /api/v1/users/:id', () => {
    /* let server;
    
    beforeAll((done) => {
        server = app.listen(3001, () => {
            done();
        });
    });
    
    afterAll((done) => {
        server.close( () => {
            done();
        });
    }); */
    test('Get user with right token should return 200', async () => {
        return request(app)
            .get('/api/v1/users/6455435187127b8931ff1c95')
            .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTU0MzUxODcxMjdiODkzMWZmMWM5NSIsImlhdCI6MTY4MzkxNjc1OH0.emD_OZXCKqcdUkHxkqO9DmfyNZwGSw7cLOPOVnLjT84')
            .expect(200);
    });
});