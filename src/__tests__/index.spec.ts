import App from '@/app/app';
import routes from '@routes/index';
import request from 'supertest';
import { expect, test, describe } from '@jest/globals';

const app = new App(routes).app;

describe('Test the /ping function', () => {
  test('It should respond the GET method with a 200', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the /validate function', () => {
  test('It should respond a POST method with a 200 if data is OK', async () => {
    const payload = {
      int: 42,
      string: 'Hello World!',
    };
    const response = await request(app).post('/validate').send(payload);
    expect(response.statusCode).toBe(200);
  });

  test('It should respond a POST method with a 400 if data is not OK', async () => {
    const payload = {
      int: 'Hello World!',
      string: 42,
    };
    const response = await request(app).post('/validate').send(payload);
    expect(response.statusCode).toBe(400);
  });
});