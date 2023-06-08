const request = require('supertest');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
import app from '../app.js';
import mongoose from 'mongoose';


var token = jwt.sign(
    { email: 'prova@example.com', id: '6455435187127b8931ff1c95' },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
);

describe('GET /api/v1/groups/:groupId', () => {
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
    test('Get group with right token should return 200', async () => {
        return request(app)
            .get('/api/v1/groups/645a61e383d06be08c4252b7')
            .set('x-auth-token', token)
            .expect(200);
    });
    test('Get group with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/groups/645a61e383d06be08c4252b7')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });

    test('Get non existing group with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/groups/fsdhuie7683')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });
    
    test('Get non existing group with good token should return 404', async () => {
        return request(app)
            .get('/api/v1/groups/fsdhjk327867423')
            .set('x-auth-token', token)
            .expect(404);
    });

});

describe('GET /api/v1/groups/:groupId/users', () => {
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
    test('Get group users with right token should return 200', async () => {
        return request(app)
            .get('/api/v1/groups/645a61e383d06be08c4252b7/users')
            .set('x-auth-token', token)
            .expect(200);
    });
    test('Get group users with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/groups/645a61e383d06be08c4252b7/users')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });

    test('Get non existing group with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/groups/fsdhuie7683/users')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });
    
    test('Get non existing group with good token should return 404', async () => {
        return request(app)
            .get('/api/v1/groups/fsdhjk327867423/users')
            .set('x-auth-token', token)
            .expect(404);
    });

});

describe('GET /api/v1/groups/:groupId/outgoings', () => {
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
    test('Get group outgoings with right token should return 200', async () => {
        return request(app)
            .get('/api/v1/groups/645a61e383d06be08c4252b7/outgoings')
            .set('x-auth-token', token)
            .expect(200);
    });
    test('Get group users with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/groups/645a61e383d06be08c4252b7/outgoings')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });

    test('Get non existing group with bad token should return 401', async () => {
        return request(app)
            .get('/api/v1/groups/fsdhuie7683/outgoings')
            .set('x-auth-token', 'token sbagliato')
            .expect(401);
    });
    
    test('Get non existing group with good token should return 404', async () => {
        return request(app)
            .get('/api/v1/groups/fsdhjk327867423/outgoings')
            .set('x-auth-token', token)
            .expect(404);
    });

});

describe('POST /api/v1/groups', () => {
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
    test('Create new group should return 201', async () => {
        return request(app)
            .post('/api/v1/groups')
            .set('x-auth-token', token)
            .send({
                name : 'Gruppo di test',
                description : 'Gruppo di test',
                groupPicture : 'prova.jpeg'
            })
            .expect(201);
    });

    test('Create new group without name should return 400', async () => {
        return request(app)
            .post('/api/v1/groups')
            .set('x-auth-token', token)
            .send({
                description : 'Gruppo di test',
                groupPicture : 'prova.jpeg'
            })
            .expect(400);
    });

});


