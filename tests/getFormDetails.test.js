import supertest from 'supertest';
import '../src/setup';
import pool from '../src/database';
import { createFakeUser } from './factories/userFactory';
import app from '../src/app';
import cleanDB from '../src/queries/cleanDB';
import insertUserDB from '../src/queries/users/insertUserDB';
import createFakeToken from './factories/tokenFactory';
import insertTokenDB from '../src/queries/sessions/insertTokenDB';

describe('GET /form-details', () => {
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
    const result = await supertest(app).get('/form-details');

    expect(result.status).toEqual(401);
  });

  it('should return list with form details if token is sent', async () => {
    const result = await supertest(app)
      .get('/plans')
      .set('Authorization', `Bearer ${userToken}`);

    expect(result.body.length > 1).toBeTruthy();
  });
});
