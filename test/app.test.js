const app = require('../app')
import request from 'supertest'

test('app module should be defined', async () => {
    expect.assertions(1)
    await expect(app).toBeDefined()
})

test('GET / should return 200', () => {
    
});

/* test('Login a user', async () => {

}) */

/* test('Login a user', async () => {
    expect.assertions(1)
    var response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email : 'prova@example.com',
            password : 'test123'
        })
    })
    expect( response.status ).toEqual(200)
})

test('Login a user with incorrect password', async () => {
    expect.assertions(1)
    var response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email : 'prova@example.com',
            password : 'test1234'
        })
    })
    expect( response.status ).toEqual(400)
})

test('Login a user with incorrect email', async () => {
    expect.assertions(1)
    var response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email : 'prova2@example.com',
            password : 'test1234'
        })
    })
    expect( response.status ).toEqual(400)
})

test('Login a user with no email given', async () => {
    expect.assertions(1)
    var response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password : 'test1234'
        })
    })
    expect( response.status ).toEqual(400)
})

test('Login a user with no password given', async () => {
    expect.assertions(1)
    var response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email : 'prova@example.com'
        })
    })
    expect( response.status ).toEqual(400)
})

test('Login a user with empty body', async () => {
    expect.assertions(1)
    var response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email : 'prova@example.com'
        })
    })
    expect( response.status ).toEqual(400)
}) */