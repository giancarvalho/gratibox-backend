import supertest from 'supertest';
import '../src/setup';
import pool from '../src/database';
import { createFakeUser } from './factories/userFactory';
import app from '../src/app';
import cleanDB from '../src/queries/cleanDB';
import insertUserDB from '../src/queries/users/insertUserDB';
import createFakeToken from './factories/tokenFactory';
import insertTokenDB from '../src/queries/sessions/insertTokenDB';

describe('GET /plans', () => {
  const user = createFakeUser();
  const userToken = createFakeToken();

  beforeAll(async () => {
    const userId = await insertUserDB(user);
    await insertTokenDB(userId, userToken);
  });

  afterAll(async () => {
    await cleanDB();
    pool.end();
  });

  it('should return 401 token is not sent', async () => {
    const result = await supertest(app).get('/plans');

    expect(result.status).toEqual(401);
  });

  it('should return list with plans if token is sent', async () => {
    const result = await supertest(app)
      .get('/plans')
      .set('Authorization', `Bearer ${userToken}`);

    expect(result.body.length > 1).toBeTruthy();
  });
});
