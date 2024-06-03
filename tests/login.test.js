const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const authRoutes = require('../routes/auth');
const { generateAccessToken } = require('../authHelpers');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);


const users = {
  testuser: {
    id: '1',
    username: 'testuser',
    passwordHash: bcrypt.hashSync('password123', 10)
  }
};


jest.mock('../authHelpers', () => ({
  generateAccessToken: jest.fn().mockReturnValue('fakeToken')
}));

describe('POST /auth/login', () => {
  test('should return a token for valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('fakeToken');
  });

  test('should return 400 if username or password is missing', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: '', password: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username and password are required');
  });

  test('should return 401 for invalid username', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'invaliduser', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });

  test('should return 401 for invalid password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });
});

