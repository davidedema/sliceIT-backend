const request = require('supertest');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
import app from '../app.js';
import mongoose from 'mongoose';

describe('POST /api/v1/auth/login', () => {
    test('should return 200', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: 'prova@example.com',
                password: 'test123'
            })
            .expect(200);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: 'prova@example.com',
            })
            .expect(400);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                password: 'test123'
            })
            .expect(400);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: 'prova@example.com',
                password: 'test1233213'
            })
            .expect(400);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: 'prova@examdasdasdple.com',
                password: 'test1233213'
            })
            .expect(400);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: 'prova@examdadsasple.com',
                password: 'test123'
            })
            .expect(400);
    });
});

describe('POST /api/v1/auth/register', () => {
    test('should return 201', async () => {
        return request(app)
            .post('/api/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                firstName: 'testing',
                lastName: 'user',
                email: 'testing@user.com',
                nickname: 'testinguser',
                password: 'testinguser123'
            })
            .expect(201);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                firstName: 'testing',
                lastName: 'user',
                nickname: 'testinguser',
                password: 'testinguser123'
            })
            .expect(400);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                firstName: 'testing',
                lastName: 'user',
                password: 'testinguser123'
            })
            .expect(400);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                firstName: 'testing',
                lastName: 'user',
                nickname: 'testinguser',
            })
            .expect(400);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                firstName: 'testing',
                lastName: 'user',
                email: 'testinguser@gmail.com',
                nickname: 'ILPRIMO',
                password: 'testinguser123'
            })
            .expect(400);
    });
    test('should return 400', async () => {
        return request(app)
            .post('/api/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                firstName: 'testing',
                lastName: 'user',
                email: 'prova@example.com',
                nickname: 'maismorales',
                password: 'testinguser123'
            })
            .expect(400);
    });
});