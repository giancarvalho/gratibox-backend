import supertest from 'supertest';
import '../src/setup';
import pool from '../src/database';
import { createFakeUser, createInvalidFakeUser } from './factories/userFactory';
import app from '../src/app';
import cleanDB from '../src/queries/cleanDB';
import insertUserDB from '../src/queries/users/insertUserDB';

describe('POST /sign-up', () => {
  let user = createFakeUser();

  beforeAll(async () => {
    await insertUserDB(user);
  });

  afterAll(async () => {
    await cleanDB();
    pool.end();
  });

  it('Should return a token if user is registered and credentials are valid', async () => {
    const result = await supertest(app).post('/sign-in').send(user);

    expect(result.body.token).toMatch(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
  });
});
