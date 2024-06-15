const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoutes = require('../routes/auth');
const Employee = require('../Database/models/employee');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

// Mock the Employee model
jest.mock('../Database/models/employee');

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    it('should return 400 if username or OTP is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Username and OTP are required');
    });

    it('should return 401 if username or OTP is invalid', async () => {
      Employee.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', otp: 'invalidotp' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid username or OTP');
    });

    it('should return 200 and prompt password change if first login', async () => {
      const user = {
        username: 'testuser',
        firstLogin: true,
        compareOTP: jest.fn().mockResolvedValue(true),
      };
      Employee.findOne.mockResolvedValue(user);

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', otp: 'validotp' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('OTP verified. Please change your password.');
      expect(response.body.firstLogin).toBe(true);
    });

    it('should return 200 and a token if login is successful', async () => {
      const user = {
        username: 'testuser',
        firstLogin: false,
        employeeId: '12345',
        compareOTP: jest.fn().mockResolvedValue(true),
      };
      Employee.findOne.mockResolvedValue(user);

      jest.spyOn(jwt, 'sign').mockReturnValue('mocktoken');

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', otp: 'validotp' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('mocktoken');
    });
  });

  describe('POST /auth/change-password', () => {
    it('should return 400 if username or newPassword is missing', async () => {
      const response = await request(app)
        .post('/auth/change-password')
        .send({ username: 'testuser' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Username and new password are required');
    });

    it('should return 400 if the user is not on first login', async () => {
      const user = {
        username: 'testuser',
        firstLogin: false,
      };
      Employee.findOne.mockResolvedValue(user);

      const response = await request(app)
        .post('/auth/change-password')
        .send({ username: 'testuser', newPassword: 'newpassword' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid request');
    });

    it('should return 200 and a token if password is changed successfully', async () => {
      const user = {
        username: 'testuser',
        firstLogin: true,
        employeeId: '12345',
        save: jest.fn().mockResolvedValue(),
      };
      Employee.findOne.mockResolvedValue(user);

      jest.spyOn(jwt, 'sign').mockReturnValue('mocktoken');

      const response = await request(app)
        .post('/auth/change-password')
        .send({ username: 'testuser', newPassword: 'newpassword' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('mocktoken');
      expect(user.firstLogin).toBe(false);
    });
  });
});
