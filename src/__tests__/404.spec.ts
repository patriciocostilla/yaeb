import App from '@/app/app';
import routes from '@routes/index';
import request from 'supertest';
import { expect, test, describe } from '@jest/globals';

const app = new App(routes).app;

describe('Test the 404 response', () => {
  test('It should respond ANY method with a 404 if there isn\'t a match', async () => {
    const path = (new Date()).getTime().toString();
    const response = await request(app).get(`/${path}/${path}`);
    expect(response.statusCode).toBe(404);
  });
});