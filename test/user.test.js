const request = require('supertest');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
import app from '../app.js';
import mongoose from 'mongoose';


var token = jwt.sign(
    { email: 'prova@example.com', id: '6455435187127b8931ff1c95' },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
);

describe('GET /api/v1/users/:id', () => {
    var connection;

    beforeAll(async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected!');
    });

    afterAll(async () => {
        try {
            await mongoose.connection.close();
            console.log("Database connection closed");
        } catch (error) {
            console.log("Error closing database connection:", error);
        }
    });
    test('Get user with right token should return 200', async () => {
        return request(app)
            .get('/api/v1/users/6455435187127b8931ff1c95')
            .set('x-auth-token', token)
            .expect(200);
    });
    test('Get user with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/users/6455435187127b8931ff1c95')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });

    test('Get non existing user with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/users/fsdhuie7683')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });
    
    test('Get non existing user with good token should return 404', async () => {
        return request(app)
            .get('/api/v1/users/fsdhjk327867423')
            .set('x-auth-token', token)
            .expect(404);
    });

});

describe('GET /api/v1/users/:id/groups', () => {
    var connection;

    beforeAll(async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected!');
    });
    afterAll(async () => {
        try {
            await mongoose.connection.close();
            console.log("Database connection closed");
        } catch (error) {
            console.log("Error closing database connection:", error);
        }
    });
    test('Get user groups with right token should return 200', async () => {
        return request(app)
            .get('/api/v1/users/6455435187127b8931ff1c95/groups')
            .set('x-auth-token', token)
            .expect(200);
    });
    test('Get user with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/users/6455435187127b8931ff1c95/groups')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });

    test('Get non existing user with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/users/fsdhuie7683/groups')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });
    
    test('Get non existing user with good token should return 404', async () => {
        return request(app)
            .get('/api/v1/users/fsdhjk327867423/groups')
            .set('x-auth-token', token)
            .expect(404);
    });

});

describe('GET /api/v1/users/:id/outgoings', () => {
    var connection;

    beforeAll(async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected!');
    });
    afterAll(async () => {
        try {
            await mongoose.connection.close();
            console.log("Database connection closed");
        } catch (error) {
            console.log("Error closing database connection:", error);
        }
    });
    test('Get user groups with right token should return 200', async () => {
        return request(app)
            .get('/api/v1/users/6455435187127b8931ff1c95/outgoings')
            .set('x-auth-token', token)
            .expect(200);
    });
    test('Get user with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/users/6455435187127b8931ff1c95/outgoings')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });

    test('Get non existing user with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/users/fsdhuie7683/outgoings')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });
    
    test('Get non existing user with good token should return 404', async () => {
        return request(app)
            .get('/api/v1/users/fsdhjk327867423/outgoings')
            .set('x-auth-token', token)
            .expect(404);
    });

});