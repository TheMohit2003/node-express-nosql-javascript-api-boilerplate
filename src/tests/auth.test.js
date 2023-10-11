const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('POST /auth/token', () => {
  it('should generate a JWT token based on the password from the request body', async () => {
    const password = 'myPassword123';
    const response = await request(app).post('/auth/token').send({ password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    const decodedToken = jwt.verify(
      response.body.token,
      process.env.JWT_SECRET
    );
    expect(decodedToken).toHaveProperty('password', password);
  });
});
