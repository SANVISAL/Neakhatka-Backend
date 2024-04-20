import request from 'supertest';
import app from '../app'; // Assuming app is exported as default
import { dbConnect,dbDisconnect,clearDatabase } from '../utils/test/handlecoonnectDB';
beforeAll(async () => {
  await dbConnect();
  await clearDatabase(); // Clear the database before running tests
});

afterAll(async () => { 
  await dbDisconnect();
});

describe('GET /tests', () => {
  it('responds with JSON message and status 200', async () => {
    // Send a GET request to the /tests endpoint
    const response = await request(app).get('/tests');

    // Assert that the response status is 200
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('list found !!'); 
  });
});
