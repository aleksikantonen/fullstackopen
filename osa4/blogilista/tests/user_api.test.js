const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('User creation', () => {
  test('fails with status 400 if username is too short', async () => {
    const newUser = { username: 'ab', name: 'ShortUsername', password: 'validpass' }
    const result = await api.post('/api/users').send(newUser)
    assert.strictEqual(result.status, 400)
    assert.strictEqual(result.body.error, 'username should be minimum of 3 chars')
  })

  test('fails with status 400 if password is too short', async () => {
    const newUser = { username: 'validuser', name: 'ShortPassword', password: 'ab' }
    const result = await api.post('/api/users').send(newUser)
    assert.strictEqual(result.status, 400)
    assert.strictEqual(result.body.error, 'password should be minimum of 3 chars')
  })

  test('fails with status 400 if username is not unique', async () => {
    const newUser = { username: 'uniqueuser', name: 'First', password: 'validpass' }
    await api.post('/api/users').send(newUser)
    const result = await api.post('/api/users').send(newUser)
    assert.strictEqual(result.status, 400)
    assert.strictEqual(result.body.error, 'username must be unique')
  })

  test('succeeds with status 201 if username and password are valid and unique', async () => {
    const newUser = { username: 'validuser', name: 'Valid', password: 'validpass' }
    const result = await api.post('/api/users').send(newUser)
    assert.strictEqual(result.status, 201)
    assert.strictEqual(result.body.username, 'validuser')
  })
})

after(async () => {
  await mongoose.connection.close()
})
